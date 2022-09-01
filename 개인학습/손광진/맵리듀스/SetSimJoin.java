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

public class SetSimJoin {

	/*
	 * Map class part
	 */

	public static class InvertedListMapper extends Mapper<Object, Text, Text, Text> {

		private Text rid = new Text();
		private Text item = new Text();

		// Text : input line
		// --> format = <p \t item item item ...>
		public void map(Object key, Text value, Context context) throws IOException, InterruptedException {

			// TODO (아이템, [레코드 키, 레코드키 , ...]) 형식으로 매핑
			// 0	a b c d e
			// ------------------------------------------------------
			String[] str = value.toString().split("\\t| "); //공백과 탭 두개의 delimiter

			item.set(str[0]);
			for(int i = 1 ; i <str.length;i++ ){
				rid.set(str[i]+" "+str.length);
				context.write(item , rid);
			}
			//역 인덱스 형식으로 ㄱㄱ
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
					keyCombi.set(String.format("%s %s", first,second));
					context.write(keyCombi,one);
				}
			}
		}
	}

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

		private static double sigma;

		private static IntWritable intWriter = new IntWritable(); 
		protected void setup(Context context) throws IOException, InterruptedException {

			Configuration config = context.getConfiguration();
			sigma = config.getFloat("threshold", -1);
		}

		public void reduce(Text key, Iterable<IntWritable> values, Context context)
				throws IOException, InterruptedException {

				int sum = 0;
				for(IntWritable val : values){
					sum += val.get();
				}
				String[] keyFrag = key.toString().split(" ");

				int firstValue =  Integer.parseInt( keyFrag[1] ) ;
				int secondValue =  Integer.parseInt(keyFrag[3]);

				//Overlap(x,y) >= theta / (1+theta) * (|x|+|y|) = a
				//오버랩이 쓰레시 홀드 보다 작으면 유사하지 않다.
				
				double a = sigma / (1+sigma) * (firstValue + secondValue);

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
		Job job1 = new Job(conf, "buildInvertedList");
		job1.setJarByClass(SetSimJoin.class);
		job1.setMapperClass(InvertedListMapper.class);
		job1.setReducerClass(InvertedListReducer.class);
		job1.setOutputKeyClass(Text.class);
		job1.setOutputValueClass(Text.class);
		job1.setNumReduceTasks(2);
		FileInputFormat.addInputPath(job1, new Path(otherArgs[1]));
		Path pathtmp = new Path("setSimJoinTmp");
		FileOutputFormat.setOutputPath(job1, pathtmp);
		if (fs.exists(pathtmp))
			fs.delete(pathtmp);
		if (!job1.waitForCompletion(true))
			System.exit(1);

		// Run phase2 job
		// TODO
		// ------------------------------------------------------
		Job job2 = new Job(conf,"phase2");
		job2.setJarByClass(SetSimJoin.class);
		job2.setMapperClass(SimMapper.class);
		job2.setReducerClass(SimReducer.class);
		job2.setOutputKeyClass(Text.class);
		job2.setOutputValueClass(IntWritable.class);
		job2.setNumReduceTasks(2);
		FileInputFormat.addInputPath(job2,pathtmp);
		Path outPath = new Path(otherArgs[2]);

		if(fs.exists(outPath)){
			fs.delete(outPath);
		}

		FileOutputFormat.setOutputPath(job2,outPath);

		if(!job2.waitForCompletion(true)){
			System.exit(1);
		}

		// ------------------------------------------------------

	}
}
