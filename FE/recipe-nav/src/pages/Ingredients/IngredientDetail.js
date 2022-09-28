import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./IngredientDetail.module.css";
import { Collapse, Image } from "antd";

import IngredientExtraDataComponent from "../../components/ingredient/IngredientExtraDataComponent";
import IngredientRecipeComponent from "../../components/ingredient/IngredientRecipeComponent";



const comparator = function (a, b) {
  return a.ingOrder - b.ingOrder;
};

const IngredientDetail = (props) => {
  const params = useParams();
  console.log(params);
  const selectedIngredient = useSelector((state) => state.ingredient.selectedIngredient);

 
  return (
    <>
      <div className={style["ingredient-detail-container"]}>
        <h2 className={style["category-text"]}>{selectedIngredient.ingName}</h2>
        <div className={style["ingredient-detail-meta"]}>
          <div className={style["ingredient-detail-head-post"]}>
            <Image src={selectedIngredient.ingImg} fluid={true} />
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
        <div className={style["footer"]}></div>
      </div>
    </>
  );
};

export default IngredientDetail;