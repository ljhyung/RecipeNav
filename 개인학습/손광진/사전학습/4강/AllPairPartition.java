package ssafy;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

import org.apache.hadoop.conf.Configuration; //hadoop excute config
import org.apache.hadoop.fs.FileSystem; //hdfs controll
import org.apache.hadoop.fs.Path; //hdfs path 
import org.apache.hadoop.io.Text; //hadoop type 
import org.apache.hadoop.mapreduce.Job; //hadoop task unit
import org.apache.hadoop.mapreduce.Mapper; //map
import org.apache.hadoop.mapreduce.Reducer; //reduce
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat; //read data in hdfs
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat; //write data in hdfs 
import org.apache.hadoop.util.GenericOptionsParser; //hadoop Programdriver main arge controller

//partition data for paraller seta join
public class AllPairPartition {
	public static class MapClass1 extends Mapper<Object, Text, Text, Text> { 

                private String Table1name;
                private String Table2name;
		private int numberOfPartitions = 2; // number of partition

		private Text emitkey = new Text();
		private Text emitval = new Text();

		public void setup(Context context) throws IOException {
			Configuration configuration = context.getConfiguration();
			Table1name = configuration.get("Table1name","r");
			Table2name = configuration.get("Table2name","s");
			numberOfPartitions = configuration.getInt("numberOfPartitions",2);
		}

		// Text : input line
		// --> format = <Relation id> \tab <record id> \tab <dimension 1> \tab
		// <dimension 2>

		public void map(Object key, Text value, Context context)
				throws IOException, InterruptedException {
			
			String[] tuple = value.toString().split( "\t" );
			
			Random rn = new Random();
			int partitionId = rn.nextInt( numberOfPartitions );
			
			for( int i = 0; i < numberOfPartitions; i++ ) {
				
				String text = "";
				System.out.println(tuple[0] + Table1name + Table2name);
				if(tuple[0].equals(Table1name)){
					text = String.format("(%d,%d)", partitionId,i);
				}else{
					if(tuple[0].equals(Table2name)){
						text = String.format("(%d,%d)", i,partitionId);
					}
				}
				emitkey.set(text);
				context.write(emitkey,value);
			}

		}
	}

	public static class ReduceClass1 extends Reducer<Text, Text, Text, Text> {

		private Text emitval = new Text();

		public void setup(Context context) throws IOException {
			Configuration configuration = context.getConfiguration();
		}

		public void reduce(Text key, Iterable<Text> values, Context context)
				throws IOException, InterruptedException {
					String s = new String();
					for(Text val : values){
						s += ("\n" + val.toString());
					}
					emitval.set(s);
					context.write(key,emitval);
		}
	}

	public static void main(String[] args) throws IOException,
			InterruptedException, ClassNotFoundException {
		Configuration conf = new Configuration();
		String[] otherArgs = new GenericOptionsParser(conf, args)
				.getRemainingArgs();

		if (otherArgs.length != 5) {
			System.out.println("usage:  <Table1name> <Table2name> <numberOfPartition> <in> <out>");
			System.exit(1);
		}

                FileSystem hdfs = FileSystem.get(conf);
                Path output = new Path(otherArgs[4]);
                if (hdfs.exists(output))
                        hdfs.delete(output, true);
						Job job = new Job(conf, "allpair-partition");
                Configuration config = job.getConfiguration();
                config.set("Table1name", otherArgs[0]);
                config.set("Table2name", otherArgs[1]);
                config.setInt("numberOfPartitions", Integer.parseInt(otherArgs[2]));
		
		job.setJarByClass(AllPairPartition.class);
		job.setNumReduceTasks(1);
		job.setMapperClass(MapClass1.class);
		job.setReducerClass(ReduceClass1.class);
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);
		FileInputFormat.addInputPath(job, new Path(otherArgs[3]));
		FileOutputFormat.setOutputPath(job, new Path(otherArgs[4]));
		if (!job.waitForCompletion(true))
			System.exit(1);
	}
}
