import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Slider } from "antd";
import style from "./PriceSearchInput.module.css";

import React, { useState } from "react";
const viewKorean = (num) => {
  num = num + "";
  let hanA = new Array(
    "",
    "일",
    "이",
    "삼",
    "사",
    "오",
    "육",
    "칠",
    "팔",
    "구",
    "십",
  );
  let danA = new Array(
    "",
    "십",
    "백",
    "천",
    "",
    "십",
    "백",
    "천",
    "",
    "십",
    "백",
    "천",
    "",
    "십",
    "백",
    "천",
  );
  let result = "";
  for (let i = 0; i < num.length; i++) {
    let str = "";
    let han = hanA[num.charAt(num.length - (i + 1))];
    if (han != "") str += han + danA[i];
    if (i == 4) str += "만 ";
    if (i == 8) str += "억 ";
    if (i == 12) str += "조 ";
    result = str + result;
  }
  if (num != 0) result = result + "원 ";
  return result;
}; //출처 : https://wonpaper.tistory.com/410
const PriceSearchInput = (props) => {
  const minPrice = props.minPrice;
  const maxPrice = props.maxPrice;
  const searchClickHadler = props.searchClickHadler;
  const scrollChangeHandle = props.scrollChangeHandle;
  const changeMinPrice = props.changeMinPrice;
  const changeMaxPrice = props.changeMaxPrice;

  return (
    <>
      <div className={style["budget-input-container"]}>
        <div className={style["min-input-box"]}>
          <Input
            size="large"
            placeholder="최솟값"
            prefix={<MinusOutlined />}
            value={minPrice}
            onChange={changeMinPrice}
            className={style["input"]}
          />

          <div className={style["input-print"]}>{viewKorean(minPrice)}</div>
        </div>
        <div className={style["max-input-box"]}>
          <Input
            size="large"
            onChange={changeMaxPrice}
            placeholder="최댓값"
            prefix={<PlusOutlined />}
            value={maxPrice}
            className={style["input"]}
          />
          <div className={style["input-print"]}>{viewKorean(maxPrice)}</div>
        </div>

        <div className={style["slide-input-box"]}>
          <Slider
            range={{
              draggableTrack: true,
            }}
            step={100}
            tooltip={"open"}
            max={500000}
            min={0}
            value={[minPrice, maxPrice]}
            onChange={scrollChangeHandle}
          />
        </div>
        <div />
      </div>
      <div className={style["button-box"]}>
        <button
          className={style["button"]}
          onClick={(e) => {
            e.target.disabled = true;
            e.target.innerHTML = "조회중";
            searchClickHadler(e).then(() => {
              console.log("검색 끝");
              e.target.disabled = false;
              e.target.innerHTML = "조회";
            });
          }}
        >
          조회
        </button>
      </div>
    </>
  );
};
export default PriceSearchInput;
