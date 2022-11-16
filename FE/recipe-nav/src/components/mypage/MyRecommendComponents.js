import { useEffect } from "react";
import style from "./MyRecommendComponents.module.css";
import { useDispatch, useSelector } from "react-redux";
import apiClient, { proxyImageURL } from "../../api/index";
import { useState } from "react";
import ReactMultiCarousel from "../common/ReactMultiCarousel";
import { useNavigate } from "react-router-dom";
import { setSelectedRecipeSimlar } from "../../store/slices/recipeSlice";
const MyRecommendComponents = (props) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [myRecommendedRecipe, setMyRecommendedRecipe] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recipeClickHadle = (val) => {
    for (let i = 0; i < myRecommendedRecipe.length; i++) {
      if (myRecommendedRecipe[i].recSeq == val) {
        dispatch(setSelectedRecipeSimlar(myRecommendedRecipe[i]));
      }
    }
    navigate(`/recipe/${val}`);
  };

  useEffect(() => {
    apiClient
      .get("/my-infos/recipes/similar", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log(response.data.msg);
        console.log(response.data.recipes);
        setMyRecommendedRecipe(response.data.recipes);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className={style["item-panel"]}>
        <div className={style["item-title"]}>
          <h2>추천 레시피</h2>
        </div>
        <div className={style["item-container"]}>
          <ReactMultiCarousel>
            {myRecommendedRecipe.map((item, index) => {
              return (
                <div className={style["small-recipe-box"]} key={index}>
                  <div className={style["small-recipe-img"]}>
                    <img src={proxyImageURL + item.recImg} />
                  </div>
                  <div
                    className={style["small-recipe-box-text"]}
                    onClick={() => recipeClickHadle(item.recSeq)}
                  >
                    {item.recName}
                  </div>
                </div>
              );
            })}
          </ReactMultiCarousel>
        </div>
      </div>
    </>
  );
};

export default MyRecommendComponents;
