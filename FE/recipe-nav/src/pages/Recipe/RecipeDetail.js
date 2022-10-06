import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./RecipeDetail.module.css";
import { Collapse, Image, message } from "antd";
import apiClient from "../../api";
import RecipeIngredientListComponent from "../../components/recipe/RecipeIngredientListComponent";

import RecipeExtraDataComponent from "../../components/recipe/RecipeExtraDataComponent";
import RecipePhaseComponent from "../../components/recipe/RecipePhaseComponent";
import RecipeReviewComponent from "../../components/recipe/RecipeReviewComponent";
import RecipeReviewInput from "../../components/recipe/RecipeReviewInput";
import axiosClient, { proxyImageURL } from "../../api";
import { setSelectedRecipeReview } from "../../store/slices/recipeSlice";
import { RollbackOutlined } from "@ant-design/icons";
import RecipeMetaDataExposeComponent from "../../components/recipe/RecipeMetaDataExposeComponent";
import RecipeScrapButtonCopmonent from "../../components/recipe/RecipeScrapButtonCopmonent";
import RecipeSimilarComponent from "../../components/recipe/RecipeSimilarComponent";
import { useEffect } from "react";
const comparator = function (a, b) {
  return a.recOrder - b.recOrder;
};

const RecipeDetail = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);

  console.log(params);

  const selectedRecipe = useSelector((state) => state.recipe.selectedRecipe);

  const backPageClickHandle = () => {
    navigate("/recipe");
  };

  useEffect(() => {
    axiosClient
      .get(`/recipes/reviews/${selectedRecipe.recSeq}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        dispatch(setSelectedRecipeReview(response.data));
      });
  }, []);

  const onReviewEditHandle = (param) => {
    console.log(param);
    apiClient
      .post(
        `/recipes/reviews/${selectedRecipe.recSeq}`,
        {
          recRevTitle: param.reviewTitle,
          recRevContent: param.reviewText,
          recRevGrade: param.reviewGrade,
        },
        { headers: { Authorization: accessToken } },
      )
      .then((response) => {
        message.info("리뷰가 등록되었습니다.");
        axiosClient
          .get(`/recipes/reviews/${selectedRecipe.recSeq}`, {
            headers: {
              Authorization: accessToken,
            },
          })
          .then((response) => {
            dispatch(setSelectedRecipeReview(response.data));
          })
          .catch((error) => {
            message.info("리뷰 등록 후 불러오기 실패");
          });
      })
      .catch((error) => {
        message.info("리뷰 등록 에러");
      });
  };
  return (
    <>
      <div className={style["back-page"]} onClick={backPageClickHandle}>
        <RollbackOutlined />
      </div>
      <div className={style["recipe-detail-container"]}>
        <div className={style["recipe-detail-head"]}>
          <h2 className={style["category-text"]}>{selectedRecipe.recName}</h2>
          <RecipeScrapButtonCopmonent
            recipeRec={selectedRecipe.recSeq}
            recipe={selectedRecipe}
          />
        </div>

        <div className={style["recipe-detail-meta"]}>
          <div className={style["recipe-detail-head-post"]}>
            <Image src={proxyImageURL + selectedRecipe.recImg} fluid="true" />
          </div>

          <div className={style["recipe-detail-desc"]}>
            <div>
              <RecipeExtraDataComponent
                recAmount={selectedRecipe.recAmount}
                cookingTime={selectedRecipe.cookingTime}
                recLevel={selectedRecipe.recLevel}
              />
            </div>
            <RecipeMetaDataExposeComponent selectedRecipe={selectedRecipe} />
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
                      recOrder={i}
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
        <div className={style["footer"]}>
          <RecipeSimilarComponent />
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
