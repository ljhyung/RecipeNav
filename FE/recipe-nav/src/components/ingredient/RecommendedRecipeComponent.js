import { useEffect, useState } from "react";
import ReactMultiCarousel from "../common/ReactMultiCarousel";
import RecipeCardComponent from "../recipe/RecipeCardComponent";
import { useSelector } from "react-redux/es/hooks/useSelector";
import apiClient from "../../api/index";
import { setSelectedIngredient } from "../../store/slices/ingredientSlice";
import {
  setSelectedRecipe,
  setSelectedRecipeSimlar,
} from "../../store/slices/recipeSlice";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import style from "./RecommendedRecipeComponent.module.css";
import { useNavigate } from "react-router-dom";
import { Row, Spin } from "antd";
import RecipeSimilarCardComponent from "../recipe/RecipeSimilarCardComponent";

const RecommendedRecipeComponent = (props) => {
  const ingredientIng = useSelector(
    (state) => state.ingredient.selectedIngredient.ingSeq,
  );
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const recipeClickHandle = (recSeq) => {
    //추천된 레시피 클릭했을 때,
    console.log(recSeq);

    for (let i = 0; i < recommendedRecipes.length; i++) {
      if (recommendedRecipes[i].recSeq == recSeq) {
        dispatch(setSelectedRecipeSimlar(recommendedRecipes[i]));
        navigate(`/recipe/${recSeq}`);
      }
    }
  };

  useEffect(() => {
    setIsReady(false);
    apiClient
      .get(`/ingredients/${ingredientIng}/recipes`, {
        headers: {
          Authorization: accessToken,
        },
        params: {
          ingredientIng,
        },
      })
      .then((response) => {
        setIsReady(true);
        console.log(response);
        setRecommendedRecipes(response.data);
        console.log(ingredientIng);
      })
      .catch((error) => {
        setIsReady(true);
        console.log(error);
      });
  }, [ingredientIng]);

  return (
    <div className={style.panel}>
      <h2>만들어 보세요!</h2>
      <ReactMultiCarousel>
        {isReady &&
          recommendedRecipes.map((recipe) => {
            return (
              <div className={style["container"]} key={recipe.recSeq}>
                <RecipeSimilarCardComponent
                  key={recipe.recSeq}
                  recipe={recipe}
                  recipeClickHandle={recipeClickHandle}
                />
              </div>
            );
          })}
        {isReady && recommendedRecipes.length == 0 && <h3>...</h3>}
        {!isReady && (
          <Row>
            <div style={{ height: "100vh" }}>
              <Spin tip="Loading..."></Spin>
            </div>
          </Row>
        )}
      </ReactMultiCarousel>
    </div>
  );
};

export default RecommendedRecipeComponent;
