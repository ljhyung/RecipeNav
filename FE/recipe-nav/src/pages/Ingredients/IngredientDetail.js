import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./IngredientDetail.module.css";
import { Collapse, Image } from "antd";
import { proxyImageURL } from "../../api";
import { RollbackOutlined } from "@ant-design/icons";
import IngredientExtraDataComponent from "../../components/ingredient/IngredientExtraDataComponent";
import IngredientRecipeComponent from "../../components/ingredient/RecommendedRecipeComponent";
import IngredientScrapButtonCopmonent from "../../components/ingredient/IngredientScrapButtonCopmonent";
import RecommendedRecipeComponent from "../../components/ingredient/RecommendedRecipeComponent";

const comparator = function (a, b) {
  return a.ingOrder - b.ingOrder;
};

const IngredientDetail = (props) => {
  
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);

  console.log(params);
  const selectedIngredient = useSelector((state) => state.ingredient.selectedIngredient);
  
  const backPageClickHandle = () => {
    navigate("/ingredient");
  };
 
  return (
    <>
      <div className={style["back-page"]} onClick={backPageClickHandle}>
        <RollbackOutlined />
      </div>
      <div className={style["ingredient-detail-container"]}>
        <div className={style["recipe-detail-head"]}>
          <h2 className={style["category-text"]}>{selectedIngredient.ingName}</h2>
          <IngredientScrapButtonCopmonent ingredientRec ={selectedIngredient.ingSeq} />
        </div>
        
        
        <div className={style["ingredient-detail-meta"]}>
          <div className={style["ingredient-detail-head-post"]}>
            <Image src={proxyImageURL + selectedIngredient.ingImg} fluid={true} />
          </div>

          <div className={style["ingredient-detail-desc"]}>
            <div>
              <IngredientExtraDataComponent
                ingName={selectedIngredient.ingName}
                ingCategory={selectedIngredient.ingCategory}
                ingDescription={selectedIngredient.ingDescription}
                ingCalorie={selectedIngredient.ingCalorie}
              />
            </div>
            <div className={style["ingredient-recipe"]}>
              <IngredientRecipeComponent/>

            </div>
            
          </div>
        </div>
        <div className={style["footer"]}>
          <RecommendedRecipeComponent/>
        </div>
      </div>
    </>
  );
};

export default IngredientDetail;