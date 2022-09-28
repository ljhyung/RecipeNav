import React from "react";
import style from "./IngredietRecipeComponent.module.css";
import { Image } from "antd";

const IngredientRecipeComponent = (props) => {
  const ingredient = props.ingredient;
  return (
    <>
      <div className={style["card-frame"]}>
        <div className={style.head}>
          <Image src={ingredient.ingImg} style={{ borderRadius: "5px" }} />
        </div>
        <div className={style.body}>
          <div
            className={style["ingredient-card-title"]}
            onClick={() => props.ingredientClickHandle(ingredient.ingSeq)}
          >
            {ingredient.ingName}
          </div>
          <div className={style["line"]} />
          <div>
            {ingredient.ingCategory} {ingredient.ingSeason}
          </div>
        </div>
        <div className={style.foot}></div>
      </div>
    </>
  );
};

export default IngredientRecipeComponent;