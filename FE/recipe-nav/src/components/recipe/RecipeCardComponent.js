import React from "react";
import style from "./RecipeCardComponent.module.css";
import { Image } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { proxyImageURL } from "../../api";
import { numberChage } from "../../api/numberFormatUtil";
const RecipeCardComponent = (props) => {
  const recipe = props.recipe;
  return (
    <>
      <div className={style["card-frame"]}>
        <div className={style.head}>
          <Image
            src={proxyImageURL + recipe.recImg}
            style={{ borderRadius: "5px" }}
            height={200}
          />
        </div>
        <div className={style.body}>
          <div
            className={style["recipe-card-title"]}
            onClick={() => props.recipeClickHandle(recipe.recSeq)}
          >
            {recipe.recName}
          </div>
          <div className={style["line"]} />
          <div>
            {recipe.cateFrac} {recipe.foodFrac}
          </div>
          <div>
            <SmileOutlined />
            {recipe.recAmount}
          </div>
          <div>{recipe.recLevel}</div>
          <div> {numberChage(recipe.recPrice)}원</div>
        </div>
        <div className={style.foot}></div>
      </div>
    </>
  );
};

export default RecipeCardComponent;
