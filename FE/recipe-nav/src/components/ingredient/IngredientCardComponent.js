import React from "react";
import style from "./IngredientCardComponent.module.css";
import { Image } from "antd";
import { proxyImageURL } from "../../api";


const IngredientCardComponent = (props) => {
  const ingredient = props.ingredient;
  return (
    <>
      <div className={style["card-frame"]}>
        <div className={style.head}>
          <Image src={proxyImageURL + ingredient.ingImg} style={{ borderRadius: "5px" }} />
        </div>
        <div className={style.body}>
          <div
            className={style["ingredient-card-title"]}
            onClick={() => props.ingredientClickHandle(ingredient.ingSeq)}
          >
            {ingredient.ingName}
          </div>
          <div className={style["line"]} />
          <div>{ingredient.ingCategory}</div> 
          <div>{ingredient.ingSeason}</div>    
        </div>
        <div className={style.foot}></div>
      </div>
    </>
  );
};

export default IngredientCardComponent;