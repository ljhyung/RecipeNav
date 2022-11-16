import React from "react";
import style from "./IngredientCardComponent.module.css";
import { Image } from "antd";
import { proxyImageURL } from "../../api";
import Graph from "./Graph";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import apiClient from "../../api/index";
import { useSelector } from "react-redux";
import IngredientScrapButtonCopmonent from "./IngredientScrapButtonComponent";

const IngredientCardComponent = (props) => {
  let ingredient = { ...props.ingredient };
  let imageUrl = ingredient.ingImg;
  let logList = ingredient.ingredientPriceLogList?.slice(-10);

  const accessToken = useSelector((state) => state.auth.accessToken);

  if (logList == null) {
    apiClient
      .get(`/ingredients/price-log/${ingredient.ingSeq}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        logList = response.data?.slice(-10);
      });
  }
  if (ingredient.ingredientPrice == null) {
    apiClient
      .get(`/ingredients/price/${ingredient.ingSeq}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log("응답 받음");
        console.log(response.data);
        const temp = response.data[0];
        console.log(temp);
        ingredient.ingredientPrice = {
          ingMinCost: temp.ingMinCost,
          ingMaxCost: temp.ingMaxCost,
          ingAvgCost: temp.ingAvgCost,
        };
        console.log(ingredient.ingredientPrice);
      });
  }

  const graph = useMemo(() => <Graph data={logList} />, []);

  if (imageUrl.startsWith("https")) {
  } else {
    imageUrl = proxyImageURL + imageUrl;
  }

  return (
    <>
      <div className={style["card-frame"]}>
        <div className={style.head}>
          <img
            onClick={() => props.ingredientClickHandle(ingredient.ingSeq)}
            src={imageUrl}
            className={style["img"]}
          />
          <div className={style.graph}>{graph}</div>
        </div>
        <div className={style.body}>
          <div className={style.row}>
            <div
              className={style["ingredient-card-title"]}
              onClick={() => props.ingredientClickHandle(ingredient.ingSeq)}
            >
              {ingredient.ingName}
            </div>
            <IngredientScrapButtonCopmonent
              ingredientIng={ingredient.ingSeq}
              ingredient={ingredient}
            />
          </div>
          <div className={style["line"]} />

          <div className={style.boxbox}>
            {ingredient.ingPriceRate != null ? (
              ingredient.ingPriceRate >= 0 ? (
                <div style={{ color: "red" }}>
                  <CaretUpOutlined />
                  {ingredient.ingPriceRate.toFixed(2)}%
                </div>
              ) : (
                <div style={{ color: "blue" }}>
                  <CaretDownOutlined />
                  {ingredient.ingPriceRate.toFixed(2)}%
                </div>
              )
            ) : (
              <div>-%</div>
            )}
            <div>최저가: {ingredient.ingredientPrice?.ingMinCost}원</div>
            <div>평균가: {ingredient.ingredientPrice?.ingAvgCost}원</div>
            <div>최대가: {ingredient.ingredientPrice?.ingMaxCost}원</div>
          </div>
        </div>
        <div className={style.foot}></div>
      </div>
    </>
  );
};

export default IngredientCardComponent;
