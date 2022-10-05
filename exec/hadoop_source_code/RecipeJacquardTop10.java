package ssafy;

import java.io.*;
import java.util.*;

import java.lang.Math;

import org.apache.hadoop.conf.*;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.*;
import org.apache.hadoop.io.compress.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.*;
import java.util.PriorityQueue;
import java.util.Collections;
public class RecipeJacquardTop10 {


	//#1---------- row별로 있는 데이터를 레시피SEQ를 key로하고 밸류는 리스트로 바꾼다.
	public static class RowConverterMapper extends Mapper<Object, Text, Text, Text> {

		private Text rid = new Text();
		private Text item = new Text();

		// Text : input line
		// --> format = <p \t item item item ...>
		public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

			//0: 레시피 SEQ
			//1: 레시피 코드
			//2: 레시피 재료 이름 
			//3: 량
			//4: 주재료 (1) , else (0)
			//우선은 이것을 , 레시피 코드, [레시피 재료 이름,레시피 이름 ,레피시이름,]으로 바꿔야한다.
				
			String[] str = value.toString().split(","); //공백과 탭 두개의 delimiter

			item.set(str[2]);
			rid.set(str[0].trim());
			context.write(rid,item);

			//(key: 레시피 SEQ, value : 레시피 재료);

		}
	}


	public static class RowConverterReducer extends Reducer<Text, Text, Text, Text> {

		private static Text valueString = new Text();
		
		public void reduce(Text key, Iterable<Text> values, Context context)
				throws IOException, InterruptedException {
			
			//단순 쓰기 작업
			StringBuilder sb = new StringBuilder();
			int count = 0 ;
			for(Text item : values){
				sb.append(item.toString()).append("\t");
				count++;
			}

			sb.deleteCharAt(sb.length()-1);//마지막 tab delete

			valueString.set(sb.toString());
			context.write(key,valueString);
		}
	}
	//#1----------end


	//#2---------- 레시피코드 , 재료:n , 재료 :n형식으로 바꾸는 작업
	public static class InvertedListMapper extends Mapper<Object, Text, Text, Text> {

		private Text recipe = new Text();
		private Text item = new Text();

		// Text : input line
		// --> format = <p \t item item item ...>
		public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

			//0: 레시피 SEQ
			//1~n :레시피에 들어가는 재료
			//
			String[] str = value.toString().split("\\t"); //공백과 탭 두개의 delimiter

			recipe.set(str[0]+","+str.length);
			for(int i = 1 ; i <str.length;i++ ){
				item.set(str[i]);
				context.write(item,recipe);
			}
			//출력은 => 레시피재료\t레시피SEQ,count
			//
			// ------------------------------------------------------

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
			// read the value list
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

	public static class SimMapper extends Mapper<Object, Text, Text, IntWritable> {

		private Text pair = new Text();
		private IntWritable count = new IntWritable();

		public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

			int valueStart = value.toString().lastIndexOf("\t");
			String keyString = value.toString().substring(0, valueStart);
			String valueString = value.toString().substring(valueStart+1);

			pair.set(keyString);
			count.set(Integer.parseInt(valueString));
			context.write(pair,count);

		}
	}

	public static class SimReducer extends Reducer<Text, IntWritable, Text, IntWritable> {

		public static class Pair{}
		private static double sigma;

		private static IntWritable intWriter = new IntWritable(); 
		private static Text key = new Text();
		protected void setup(Context context) throws IOException, InterruptedException {

			Configuration config = context.getConfiguration();
			sigma = config.getFloat("threshold", -1);
		}

		public void reduce(Text key, Iterable<IntWritable> values, Context context)
				throws IOException, InterruptedException {
				//PriorityQueue<>
				int sum = 0;
				for(IntWritable val : values){
					sum += val.get();
				}
				String[] keyFrag = key.toString().split("\\t|,");

				int firstValue =  Integer.parseInt( keyFrag[1] ) ;
				int secondValue =  Integer.parseInt(keyFrag[3]);

				//Overlap(x,y) >= theta / (1+theta) * (|x|+|y|) = a
				//오버랩이 쓰레시 홀드 보다 작으면 유사하지 않다.
				
				double a = sigma / (1+sigma) * (firstValue + secondValue);

				key.set(String.format("%s\t%s",keyFrag[0],keyFrag[2])+"//"+sum+"//"+a);
				intWriter.set(sum);
				context.write(key,intWriter);

				

		}
	}


	public static void main(String[] args) throws IOException, InterruptedException, ClassNotFoundException {
		Configuration conf = new Configuration();// 자카드 조인
		FileSystem fs = FileSystem.get(conf);
		String[] otherArgs = new GenericOptionsParser(conf, args).getRemainingArgs();
		
		if (otherArgs.length != 3) {
			System.out.println("usage: <threshold> <in> <out>");
			System.exit(2);
		}

		conf.setFloat("threshold", (float) Double.parseDouble(otherArgs[0]));

		FileSystem hdfs = FileSystem.get(conf);
		Path output = new Path(otherArgs[2]);
		if (hdfs.exists(output))
			hdfs.delete(output, true);

		// run phase1 job
		Job jobInit = new Job(conf, "data transformation job ,,, row to key valueList");
		jobInit.setJarByClass(RecipeJacquard.class);
		jobInit.setMapperClass(RowConverterMapper.class);
		jobInit.setReducerClass(RowConverterReducer.class);
		jobInit.setOutputKeyClass(Text.class);
		jobInit.setOutputValueClass(Text.class);
		
		//jobInit.setNumReduceTasks(2);
		//시스템이 알아서 정하게
		FileInputFormat.addInputPath(jobInit, new Path(otherArgs[1]));
		Path pathtmp = new Path("./temp/RecipeJacquardTmp1");
		FileOutputFormat.setOutputPath(jobInit, pathtmp);
		if (fs.exists(pathtmp))
			fs.delete(pathtmp);
		if (!jobInit.waitForCompletion(true))
			System.exit(1);
		//phase1 end

		//run phase2
                Job job1 = new Job(conf, "buildInvertedList");
                job1.setJarByClass(RecipeJacquard.class);
                job1.setMapperClass(InvertedListMapper.class);
                job1.setReducerClass(InvertedListReducer.class);
                job1.setOutputKeyClass(Text.class);
                job1.setOutputValueClass(Text.class);
                //job1.setNumReduceTasks(2);
                //시스템에 맡겨라
		FileInputFormat.addInputPath(job1, pathtmp);
                Path pathtmp2 = new Path("./temp/RecipeJacquardTmp2");
                FileOutputFormat.setOutputPath(job1, pathtmp2);
                if (fs.exists(pathtmp2))
                        fs.delete(pathtmp2);
                if (!job1.waitForCompletion(true))
                        System.exit(1);
		//phase2 end

		// Run phase3 job
		Job job2 = new Job(conf,"phase2");
		job2.setJarByClass(RecipeJacquard.class);
		job2.setMapperClass(SimMapper.class);
		job2.setReducerClass(SimReducer.class);
		job2.setOutputKeyClass(Text.class);
		job2.setOutputValueClass(IntWritable.class);
		//job2.setNumReduceTasks(2);
		//시스템에 맡기라고
		FileInputFormat.addInputPath(job2,pathtmp2);
		Path outPath = new Path(otherArgs[2]);

		if(fs.exists(outPath)){
			fs.delete(outPath);
		}

		FileOutputFormat.setOutputPath(job2,outPath);

		if(!job2.waitForCompletion(true)){
			System.exit(1);
		}

		//phase3 end

	}
}
