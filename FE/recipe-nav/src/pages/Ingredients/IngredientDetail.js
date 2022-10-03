import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./IngredientDetail.module.css";
import { Collapse, Image } from "antd";
import { proxyImageURL } from "../../api";
import { RollbackOutlined } from "@ant-design/icons";
import IngredientGraphComponent from "../../components/ingredient/IngredientGraphComponent";

import IngredientScrapButtonComponent from "../../components/ingredient/IngredientScrapButtonComponent";
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
    navigate(-1);
  };
 
  return (
    <>
      <div className={style["back-page"]} onClick={backPageClickHandle}>
        <RollbackOutlined />
      </div>
      <div className={style["ingredient-detail-container"]}>
        <div className={style["recipe-detail-head"]}>
          <h2 className={style["category-text"]}>{selectedIngredient.ingName}</h2>
          <IngredientScrapButtonComponent ingredientIng ={selectedIngredient.ingSeq} />
        </div>
        
        
        <div className={style["ingredient-detail-meta"]}>
          <div className={style["ingredient-detail-head-post"]}>
            <Image src={proxyImageURL + selectedIngredient.ingImg} fluid={true} />
          </div>

          <div className={style["ingredient-detail-desc"]}>
            <div>평균가격</div>
            <div>
              <IngredientGraphComponent/>
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