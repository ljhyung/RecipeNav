import React from "react";
import style from "./RecipeSimilarCardComponent.module.css";
import { Image } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { proxyImageURL } from "../../api";
const RecipeSimilarCardComponent = (props) => {
  const recipe = props.recipe;
  return (
    <>
      <div className={style["card-frame"]}>
        <div className={style.head}>
          <Image
            src={proxyImageURL + recipe.recImg}
            style={{ borderRadius: "5px" }}
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
          <div>{recipe.recPrice}</div>
        </div>
        <div className={style.foot}></div>
      </div>
    </>
  );
};

export default RecipeSimilarCardComponent;