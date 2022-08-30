package ssafy;

import org.apache.hadoop.util.ProgramDriver;

public class Driver {
	public static void main(String[] args) {
		int exitCode = -1;
		ProgramDriver pgd = new ProgramDriver();
		try {
			pgd.addClass("wordcount", Wordcount.class, "A map/reduce wordcount");
			pgd.addClass("wordcount1char", Wordcount1char.class, "A map/reduce first char key");
			pgd.addClass("wordcountsort", Wordcountsort.class, "A map/reduce partitoner practice");
			pgd.addClass("inverted",InvertedIndex.class,"A map/reduce program thar generates the inverted Index using words in the input file");
      		pgd.addClass("matrixadd",MatrixAdd.class,"A map/reduce program that sum matrix");
			
			pgd.addClass("matmulti",MatrixMulti.class,"1-Phase Matrix Multiplication Preparation");
			pgd.addClass("allpair",AllPairPartition.class,"A map/reduce program that pratitions all pairs of tutples from both tables");
			pgd.addClass("itemcount",CommonItemCount.class,"A map/reduce prgoram that performs the common item count using the inverted for a single input filee.");
			pgd.addClass("topksearch",TopKSearch.class,"A map/reduce progoram that performs the top-k search for a single input file.");
			
			pgd.driver(args);
			exitCode = 0;
		}
		catch(Throwable e) {
			e.printStackTrace();
		}

		System.exit(exitCode);
	}
}
