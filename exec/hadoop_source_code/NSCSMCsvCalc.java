package ssafy;

import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.DoubleWritable;

import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

public class NSCSMCsvCalc {

	public static class TokenizerMapper
			extends Mapper<Object,Text,Text,DoubleWritable> {
			

		private Text keyValue = new Text();//ㄱ키가 되는 것
		//key : (판매일 , 상품 코드 , 상세 삼품 코드)
		// map function (Context -> fixed parameter)
		private DoubleWritable priceAndUnit = new DoubleWritable();
		public void map(Object key, Text value, Context context)
				throws IOException, InterruptedException {
		//하둡은 기본적으로 UTF8
		//만약 아니라면 hadoop-site.xml을 고쳐야하는데 우리는 못함
			String[] values = value.toString().split(",");
			if("PRCE_REG_YMD".equals(values[0])){
				return;
			}
			if(values.length < 23){
				return; //정보 누락 데이터
			}
			//0:가격 등록일자,판매일 ****
			//8:품목 코드 ****
			//9:품목명****
			//10:품종 코드****
			//11:품종명***
			//12:도소매조사 구분 코드**
			//13:조사 구분명**
			//14:산물 등급 코드
			//15:등급 명
			//16: 품목 가격***
			//19: 도매출하단위 크기
			//20:도매출 하단위명
			//21:소매출 하단위 크기***
			//22:소매출 하단위명
			String specificProductCode = values[10];

			String filterAxis = "01"; //소매 코드명

			if(!filterAxis.equals(values[12])){
				return; //소매가 아니면  데이터 에서 뺸다.
			}
			if(specificProductCode.length()==1){
				specificProductCode = "0"+specificProductCode;
			}

			//우리 가격 단위는 => 개,g,리터
			double price = Double.parseDouble(values[16]);
			int count = 0;
			try{
			count = Integer.parseInt(values[21]);
			}catch(Exception e){
				String temp = "";
				for(int i = 0 ; i < values.length;i++){
					temp+=values[i]+",";
				}
				throw new IOException(temp);
			}
			String unit = values[22];
			if("kg".equals(unit)){
				unit = "g";
				price /= 1000;
			}else if("L".equals(unit)){
				//이건 걍 쓰면 되는데 ?
			}else{
				unit = "q";
			}
			priceAndUnit.set(1.0 * price / count);

			String date = String.format("%s-%s-%s",values[0].substring(0,4), values[0].substring(4,6), values[0].substring(6,8));
			keyValue.set(String.format("%s\t%s\t%s\t%s",date,values[8],specificProductCode,unit));
			//하둡 리듀서의 key value 기본 스플릿은 tab
			context.write(keyValue,priceAndUnit);
			//

		}
	}

	public static class ConcatenateReducer
			extends Reducer<Text,DoubleWritable,Text,Text> {


		private Text outValue = new Text();
		public void reduce(Text key, Iterable<DoubleWritable> values, Context context) 
				throws IOException, InterruptedException {	
				
			double sum = 0;
			double max = 0;
			double min = Integer.MAX_VALUE;
			double item;
			double avg = 0;
			int count = 0;	
			for(DoubleWritable itemWrap : values){
				item = itemWrap.get();
				sum += item;
				if(max < item){
					max = item;
				}
				if(min > item){
					min = item;
				}
				count++;
			}

			avg = sum / count; //카운트가 설마 0이겠냐

			outValue.set(String.format("%f\t%f\t%f",min,max,avg));


			context.write(key,outValue);
		}
	}


	/* Main function */
	public static void main(String[] args) throws Exception {
		Configuration conf = new Configuration();
		String[] otherArgs = new GenericOptionsParser(conf,args).getRemainingArgs();
		if ( otherArgs.length != 2 ) {
			System.err.println("Usage: <in> <out>");
			System.exit(2);
		}
		FileSystem hdfs = FileSystem.get(conf);
		Path ouput = new Path(otherArgs[1]);
		if(hdfs.exists(ouput)){
			hdfs.delete(ouput,true);
		}
		Job job = new Job(conf,"NSCSM Data Calc Process");
		job.setJarByClass(NSCSMCsvCalc.class);

		// let hadoop know my map and reduce classes
		job.setMapperClass(TokenizerMapper.class);
		job.setReducerClass(ConcatenateReducer.class);

		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(DoubleWritable.class);
		//맵과 리듀서 출력 다름, 꼭 필요한 것도 아님
		// set number of reduces
		// 클러 스터 구성하는 데이터 노드 몇개임 ????
		job.setNumReduceTasks(10);
		
		// set input and output directories
		FileInputFormat.addInputPath(job,new Path(otherArgs[0]));
		FileOutputFormat.setOutputPath(job,new Path(otherArgs[1]));
		System.exit(job.waitForCompletion(true) ? 0 : 1 );
	}
}

