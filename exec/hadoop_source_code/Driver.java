package ssafy;

import org.apache.hadoop.util.ProgramDriver;

public class Driver {
	public static void main(String[] args) {
		int exitCode = -1;
		ProgramDriver pgd = new ProgramDriver();
		try {
			pgd.addClass("nscsm_csv_calc", NSCSMCsvCalc.class, "nong su chuck san mull csv file calculation");
			pgd.addClass("recipe_simil_calc",RecipeJacquard.class,"recipe similarity calc");
			pgd.addClass("ingredient", Ingredient.class, "ingredient information");	
      pgd.addClass("ingredient_code", IngredientCode.class, "ingredient and code information");	
			
      			pgd.addClass("similar_user",SimilarUser.class,"calculate similar user");
      			pgd.driver(args);
			exitCode = 0;
		}
		catch(Throwable e) {
			e.printStackTrace();
		}

		System.exit(exitCode);
	}
}
