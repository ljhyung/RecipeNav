import { useEffect } from "react";
import style from "./MyRecommendComponents.module.css";
import { useSelector } from "react-redux";
import apiClient, { proxyImageURL } from "../../api/index";
import { useState } from "react";
import ReactMultiCarousel from "../common/ReactMultiCarousel";
const MyRecommendComponents = (props) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [myRecommendedRecipe, setMyRecommendedRecipe] = useState([]);
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
                <div className={style["small-recipe-box"]}>
                  <div className={style["small-recipe-img"]}>
                    <img src={proxyImageURL + item.recImg} />
                  </div>
                  <div className={style["small-recipe-box-text"]}>
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
