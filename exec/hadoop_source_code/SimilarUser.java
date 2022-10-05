package ssafy;

import java.io.*;
import java.util.*;

import java.lang.Math;
import java.util.PriorityQueue;
import org.apache.hadoop.conf.*;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.*;
import org.apache.hadoop.io.compress.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.*;

public class SimilarUser {

	//#1 필요한 데이터를 구하기 위해 데이터 전처리
	public static class RowConverterMapper extends Mapper<Object, Text, Text, Text> {

		private Text rid = new Text();
		private Text item = new Text();

		// Text : input line
		// --> format = <p \t item item item ...>
		public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

			
			//value[0] : seq
			//value[1] : rec_seq
			//value[2] : userSeq	
			String[] str = value.toString().split(",");

			item.set(str[1]);
			rid.set(str[2]);
			context.write(rid,item);

			//(key:user, value : recipe);

		}
	}


	public static class RowConverterReducer extends Reducer<Text, Text, Text, Text> {

		private static Text valueString = new Text();
		
		public void reduce(Text key, Iterable<Text> values, Context context)
				throws IOException, InterruptedException {
			
			//user , [recipe,recipe,recipe]
			StringBuilder sb = new StringBuilder();

			int count = 0 ;
				
			for(Text item : values){
				sb.append(item.toString()).append("\t");
				count++;
			}

			

			sb.deleteCharAt(sb.length()-1);//마지막 tab delete

			valueString.set(count+"\t"+sb.toString());
			context.write(key,valueString);
			//출력 : user userLikeCount recipe1 recipe2
			//r공백은 tab이다 .

		}
	}
	//#1----------end


	//#2---------- 유저 유저 좋아용 상관 관계 만들기
	public static class InvertedListMapper extends Mapper<Object, Text, Text, Text> {

		private Text user = new Text();
		private Text item = new Text();

		// Text : input line
		// --> format = <p \t item item item ...>
		public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

			//
			String[] str = value.toString().split("\\t"); //공백과 탭 두개의 delimiter
			// 0 : 유저 , 1:유저의 좋아요 갯수, 2,3,4.... 레시피 seq
			user.set(String.format("%s:%s",str[0],str[1]));
			//유저:유저 좋아요 갯수
			for(int i = 2 ; i <str.length;i++ ){
				item.set(str[i]);
				context.write(item,user);
			}
			//(레시피,유저:유저 좋아요 갯수)

		}
	}

	/*
	 * Reduce class part
	 */

	public static class InvertedListReducer extends Reducer<Text, Text, Text, IntWritable> {

		private static IntWritable one = new IntWritable(1);
		private static Text keyCombi = new Text();
		// input: < item, [p:p.size, ..., q:q.size] >
		public void reduce(Text key, Iterable<Text> values, Context context)
				throws IOException, InterruptedException {
		
			// (레시피, ["user1:유저 좋아요 갯수","user2:유저 좋아요 갯수"])
		
			ArrayList<String> str = new ArrayList<String>();
			for (Text val : values) {
				str.add(val.toString());
			}

			//str.length C 2
			// TODO, 주어진 아이템(원래 키) 간의 nC2를 수행한다. 단 , 조합은 정렬되어 있어야 한다.
 
			String first;
			String second;
			String temp;
			for(int i = 0 ; i <str.size();i++){
				for(int j = i + 1 ;j < str.size();j++){

					first = str.get(i);
					second = str.get(j);
					if(first.compareTo(second) > 0){
						temp = first;
						first = second;
						second= temp;
					}
					keyCombi.set(String.format("%s\t%s", first,second));
					context.write(keyCombi,one);
				}
			}
		}
	}
	//#2end----------

	//#3 start . .. . . 뭐 잘해봐라
	public static class SimMapper extends Mapper<Object, Text, Text, IntWritable> {

		private Text pair = new Text();
		private IntWritable count = new IntWritable();

		public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
			//유저:총갯 유저,총갯 1
			//
			int valueStart = value.toString().lastIndexOf("\t");
			String keyString = value.toString().substring(0, valueStart);
			String valueString = value.toString().substring(valueStart+1);

			pair.set(keyString);
			count.set(Integer.parseInt(valueString));
			context.write(pair,count);

		}
	}

	public static class SimReducer extends Reducer<Text, IntWritable, Text, DoubleWritable> {

		private static DoubleWritable doubleWriter = new DoubleWritable(); 
		private static Text keyVal = new Text();

		public void reduce(Text key, Iterable<IntWritable> values, Context context)
				throws IOException, InterruptedException {
				
				//key user:count usercount /// value : [1,1,1,1,1,1,1,1,1,1,1,1]

				double sum = 0;
				for(IntWritable val : values){
					sum += val.get();
				}

				String[] keyFrag = key.toString().split("\\t|:");
				//탭과 콜론 으로 분리

				int firstValue =  Integer.parseInt( keyFrag[1] );//첫번째 집합 갯수
				int secondValue =  Integer.parseInt(keyFrag[3]);//두번째 집합 갯수

				//Overlap(x,y) >= theta / (1+theta) * (|x|+|y|) = a
				//오버랩이 쓰레시 홀드 보다 작으면 유사하지 않다.
				//sum = 교집합의 갯수
				//합집합의 갯수= 첫집합 갯수 +  두번쨰 집합 갯수- 교집합 갯수
				//double a = sigma / (1+sigma) * (firstValue + secondValue);

				//key.set(String.format("%s\t%s",keyFrag[0],keyFrag[2]));
				

				double similMeasure = sum / (firstValue + secondValue - sum);

				
				doubleWriter.set(similMeasure);
				keyVal.set(keyFrag[0]+"\t"+keyFrag[2]);
				

				context.write(keyVal,doubleWriter);

				//key : 유저 유저 value : 계산값

		}
	}
	//phase4 start --
	public static class SimMapper2 extends Mapper<Object, Text, Text, Text> {

		private Text keyVal= new Text();
		private Text pair = new Text();

		public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

			//key1 \t key2 \t value:ㅈ
			String[] queontom = value.toString().split("\\t");
			keyVal.set(queontom[0]);
			pair.set(queontom[1]+"\t"+queontom[2]);
			context.write(keyVal,pair);
			
			keyVal.set(queontom[1]);
			pair.set(queontom[0]+"\t"+queontom[2]);
			context.write(keyVal,pair);

		}
	}

	public static class SimReducer2 extends Reducer<Text, Text, Text, DoubleWritable> {


		private static DoubleWritable doubleWriter = new DoubleWritable(); 
		private static Text keyVal = new Text();
			
		public static class Pair implements Comparable<Pair>{
			public String key;
			public double value;

			public Pair(String key,double value){
				this.key = key;
				this.value = value;
			}
			@Override
			public int compareTo(Pair o) {
				return Double.compare(o.value,this.value);
			}
		}

		public void reduce(Text key, Iterable<Text> values, Context context)
				throws IOException, InterruptedException {
			
			//key 주체 레시피
			//value : 연관 레시피\t value

			PriorityQueue<Pair> pq = new PriorityQueue<>();
			
			String[] temps;

			for(Text item : values){
				temps = item.toString().split("\\t");
				pq.offer(new Pair(temps[0],Double.parseDouble(temps[1])));
			}
			
			Pair tempPair;
			for(int i = 0; i < pq.size() && i < 10 ;i++){
				tempPair = pq.poll();
				keyVal.set(String.format("%s\t%s",key.toString(),tempPair.key));
				doubleWriter.set(tempPair.value);
				context.write(keyVal,doubleWriter);
			}
				

		}
	}


	//phase4 end 

	public static void main(String[] args) throws IOException, InterruptedException, ClassNotFoundException {
		Configuration conf = new Configuration();// 유사 사용자 구하기
		FileSystem fs = FileSystem.get(conf);
		String[] otherArgs = new GenericOptionsParser(conf, args).getRemainingArgs();
		
		if (otherArgs.length != 3) {
			System.out.println("usage: <threshold> <in> <out>");
			System.exit(2);
		}


		FileSystem hdfs = FileSystem.get(conf);
		Path output = new Path(otherArgs[2]);
		if (hdfs.exists(output))
			hdfs.delete(output, true);

		// run phase1 job
		Job jobInit = new Job(conf, "data transformation job ,,, row to key valueList");
		jobInit.setJarByClass(SimilarUser.class);
		jobInit.setMapperClass(RowConverterMapper.class);
		jobInit.setReducerClass(RowConverterReducer.class);
		jobInit.setOutputKeyClass(Text.class);
		jobInit.setOutputValueClass(Text.class);
		
		//jobInit.setNumReduceTasks(2);
		//시스템이 알아서 정하게
		FileInputFormat.addInputPath(jobInit, new Path(otherArgs[1]));
		Path pathtmp = new Path("./temp/SimilarUserTmp1");
		FileOutputFormat.setOutputPath(jobInit, pathtmp);
		if (fs.exists(pathtmp))
			fs.delete(pathtmp);
		if (!jobInit.waitForCompletion(true))
			System.exit(1);
		//phase1 end

		//run phase2
                Job job1 = new Job(conf, "buildInvertedList");
                job1.setJarByClass(SimilarUser.class);
                job1.setMapperClass(InvertedListMapper.class);
                job1.setReducerClass(InvertedListReducer.class);
                job1.setOutputKeyClass(Text.class);
                job1.setOutputValueClass(Text.class);
                //job1.setNumReduceTasks(2);
                //시스템에 맡겨라
		FileInputFormat.addInputPath(job1, pathtmp);
                Path pathtmp2 = new Path("./temp/SimilarUserTmp2");
                FileOutputFormat.setOutputPath(job1, pathtmp2);
                if (fs.exists(pathtmp2))
                        fs.delete(pathtmp2);
                if (!job1.waitForCompletion(true))
                        System.exit(1);
		//phase2 end

		// Run phase3 job
		Job job2 = new Job(conf,"phase2");
		job2.setJarByClass(SimilarUser.class);
		job2.setMapperClass(SimMapper.class);
		job2.setReducerClass(SimReducer.class);
		job2.setOutputKeyClass(Text.class);
		job2.setOutputValueClass(IntWritable.class);
		//job2.setNumReduceTasks(2);
		//시스템에 맡기라고
                Path pathtmp3 = new Path("./temp/SimilarUserTmp3");
		FileInputFormat.addInputPath(job2,pathtmp2);

		if(fs.exists(pathtmp3)){
			fs.delete(pathtmp3);
		}

		FileOutputFormat.setOutputPath(job2,pathtmp3);

		if(!job2.waitForCompletion(true)){
			System.exit(1);
		}

		//phase3 end
		//
		//phase4 start
		Job job3 = new Job(conf,"phase3");
		job3.setJarByClass(SimilarUser.class);
		job3.setMapperClass(SimMapper2.class);
		job3.setReducerClass(SimReducer2.class);
		job3.setOutputKeyClass(Text.class);
		job3.setOutputValueClass(Text.class);
		//job2.setNumReduceTasks(2);
		//시스템에 맡기라고
                Path outPath = new Path(args[2]);
		FileInputFormat.addInputPath(job3,pathtmp3);

		if(fs.exists(outPath)){
			fs.delete(outPath);
		}

		FileOutputFormat.setOutputPath(job3,outPath);

		if(!job3.waitForCompletion(true)){
			System.exit(1);
		}



	}
}
