import React from "react";
import style from "./RecipeCardComponent.module.css";
import { Image } from "antd";
import { SmileOutlined } from "@ant-design/icons";
const RecipeCardComponent = (props) => {
  const recipe = props.recipe;
  return (
    <>
      <div className={style["card-frame"]}>
        <div className={style.head}>
          <Image src={recipe.recImg} style={{ borderRadius: "5px" }} />
        </div>
        <div className={style.body}>
          <div className={style["recipe-card-title"]}>{recipe.recName}</div>
          <div className={style["line"]} />
          <div>
            {recipe.cateFrac} {recipe.foodFrac}
          </div>
          <div>
            <SmileOutlined />
            {recipe.recAmount}
          </div>
          <div>{recipe.recLevel}</div>
          <div>{recipe.recPrice}</div>
        </div>
        <div className={style.foot}></div>
      </div>
    </>
  );
};

export default RecipeCardComponent;
