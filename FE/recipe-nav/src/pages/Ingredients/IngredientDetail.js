import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./IngredientDetail.module.css";
import { Collapse, Image } from "antd";
import RecipeIngredientListComponent from "../../components/recipe/RecipeIngredientListComponent";

import RecipeExtraDataComponent from "../../components/recipe/RecipeExtraDataComponent";
import RecipePhaseComponent from "../../components/recipe/RecipePhaseComponent";
import RecipeReviewComponent from "../../components/recipe/RecipeReviewComponent";
import RecipeReviewInput from "../../components/recipe/RecipeReviewInput";

const comparator = function (a, b) {
  return a.recOrder - b.recOrder;
};

const IngredientDetail = (props) => {
  const params = useParams();
  console.log(params);
  const selectedRecipe = useSelector((state) => state.recipe.selectedRecipe);

  const onReviewEditHandle = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className={style["recipe-detail-container"]}>
        <h2 className={style["category-text"]}>{selectedRecipe.recName}</h2>
        <div className={style["recipe-detail-meta"]}>
          <div className={style["recipe-detail-head-post"]}>
            <Image src={selectedRecipe.recImg} fluid={true} />
          </div>

          <div className={style["recipe-detail-desc"]}>
            <div>
              <RecipeExtraDataComponent
                recAmount={selectedRecipe.recAmount}
                cookingTime={selectedRecipe.cookingTime}
                recLevel={selectedRecipe.recLevel}
              />
            </div>
            <p>{selectedRecipe.recSummary}</p>
          </div>
          <div>
            <h3
              className={`${style["category-text"]} ${style["ingredient-bar"]}`}
            >
              &nbsp;재료
            </h3>
            <RecipeIngredientListComponent
              recipeIngredientList={selectedRecipe.recipeIngredientList}
            />
          </div>
        </div>
        <div className={style["recipe-detail-phase-container"]}>
          <h2 className={style["phase-text-bar"]}>조리 과정</h2>
          <Collapse>
            <Collapse.Panel>
              {[...selectedRecipe.recipeProcessList]
                .sort(comparator)
                .map((phase, i) => {
                  return (
                    <RecipePhaseComponent
                      phase={phase}
                      key={phase.recProSeq}
                    ></RecipePhaseComponent>
                  );
                })}
            </Collapse.Panel>
          </Collapse>
        </div>
        <div className={style["recipe-review-container"]}>
          <h2 className={style["review-text-bar"]}>리뷰</h2>
          <RecipeReviewComponent
            reviews={selectedRecipe.reviews}
          ></RecipeReviewComponent>
          <RecipeReviewInput
            onClickHandle={onReviewEditHandle}
          ></RecipeReviewInput>
        </div>
        <div className={style["footer"]}></div>
      </div>
    </>
  );
};

export default IngredientDetail;