import { useEffect, useState } from "react";
import ReactMultiCarousel from "../common/ReactMultiCarousel";
import RecipeCardComponent from "./RecipeCardComponent";
import { useSelector } from "react-redux/es/hooks/useSelector";
import apiClient from "../../api/index";
import { setSelectedRecipe } from "../../store/slices/recipeSlice";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import style from "./RecipeSimilarComponent.module.css";

const RecipeSimilarComponent = (props) => {
  const recipeRec = useSelector((state) => state.recipe.selectedRecipe.recSeq);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [similarRecipes, setSimilarRecipes] = useState([]);

  const recipeClickHandle = (recSeq) => {
    //레시피 클릭했을 때,
    console.log(recSeq);

    dispatch(setSelectedRecipe(recSeq));
  };

  useEffect(() => {
    apiClient
      .get(`/recipes/similar/${recipeRec}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response);
        setSimilarRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [recipeRec]);

  return (
    <div className={style.panel}>
      <h2>이런 레시피는 어떠신가요?</h2>
      <ReactMultiCarousel>
        {similarRecipes.map((recipe) => {
          return (
            <div className={style["container"]} key={recipe.recSeq}>
              <RecipeCardComponent
                recipe={recipe}
                recipeClickHandle={recipeClickHandle}
              />
            </div>
          );
        })}
      </ReactMultiCarousel>
    </div>
  );
};

export default RecipeSimilarComponent;
