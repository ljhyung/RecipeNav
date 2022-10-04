import React from "react";
import style from "./IngredientCardComponent.module.css";
import { Image } from "antd";
import { proxyImageURL } from "../../api";
import Graph from "./Graph";
const IngredientCardComponent = (props) => {
  const ingredient = props.ingredient;
  let imageUrl = ingredient.ingImg;
  let logList = ingredient.ingredientPriceLogList?.slice(-10);
  if (logList == null) {
    logList = [];
  }
  if (imageUrl.startsWith("https")) {
  } else {
    imageUrl = proxyImageURL + imageUrl;
  }
  return (
    <>
      <div className={style["card-frame"]}>
        <div className={style.head}>
          <Image src={imageUrl} style={{ borderRadius: "5px" }} width={200} />
          <div className={style.graph}>
            <Graph data={logList} />
          </div>
        </div>
        <div className={style.body}>
          <div
            className={style["ingredient-card-title"]}
            onClick={() => props.ingredientClickHandle(ingredient.ingSeq)}
          >
            {ingredient.ingName}
          </div>
          <div className={style["line"]} />

          <div className={style.boxbox}>
            <div>{ingredient.ingPriceRate}</div>
            <div>{ingredient.ingredientPrice.ingMinCost}</div>
            <div>{ingredient.ingredientPrice.ingAvgCost}</div>
            <div>{ingredient.ingredientPrice.ingMaxCost}</div>
          </div>
        </div>
        <div className={style.foot}></div>
      </div>
    </>
  );
};

export default IngredientCardComponent;
