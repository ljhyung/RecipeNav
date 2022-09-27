import React from "react";
import style from "./IngredientCardComponent.module.css";
import { Image } from "antd";
import { SmileOutlined } from "@ant-design/icons";
const IngredientCardComponent = (props) => {
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
            {ingredient.cateFing} {ingredient.foodFing}
          </div>
          <div>
            <SmileOutlined />
            {ingredient.ingAmount}
          </div>
          <div>{ingredient.ingLevel}</div>
          <div>{ingredient.ingPrice}</div>
        </div>
        <div className={style.foot}></div>
      </div>
    </>
  );
};

export default IngredientCardComponent;