import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import { proxyImageURL } from "../../api";
import RecipeExtraDataComponent from "../recipe/RecipeExtraDataComponent";
import RecipeMetaDataExposeComponent from "../recipe/RecipeMetaDataExposeComponent";

import style from "./ReciepeBoxComponent.module.css";
import { setSelectedRecipe } from "../../store/slices/recipeSlice";
import { useDispatch } from "react-redux";

const ReciepeBoxComponent = (props) => {
  const recipe = props.recipe;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detailClickEventHandle = (e) => {
    e.preventDefault();
    console.log("이동");
    dispatch(setSelectedRecipe(recipe.recSeq));
    navigate(`/recipe/${recipe.recSeq}`);
  };
  return (
    <>
      <div className={style["card-frame"]}>
        <div>
          <h2 className={style["category-text"]}>{recipe.recName}</h2>
        </div>

        <div className={style["recipe-detail-meta"]}>
          <div className={style["recipe-detail-head-post"]}>
            <Image
              src={proxyImageURL + recipe.recImg}
              style={{ borderRadius: "10px" }}
              fluid
            />
          </div>

          <div className={style["recipe-detail-desc"]}>
            <div>
              <RecipeExtraDataComponent
                recAmount={recipe.recAmount}
                cookingTime={recipe.cookingTime}
                recLevel={recipe.recLevel}
              />
            </div>
            <RecipeMetaDataExposeComponent selectedRecipe={recipe} />
          </div>
          <div>
            <h3
              className={`${style["category-text"]} ${style["ingredient-bar"]}`}
            ></h3>
          </div>
          <button
            className={style["recipe-scrap-button"]}
            onClick={detailClickEventHandle}
          >
            상세보기
          </button>
        </div>
      </div>
    </>
  );
};

export default ReciepeBoxComponent;
