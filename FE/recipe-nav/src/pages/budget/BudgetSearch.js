import React, { useState } from "react";
import { Input, Slider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import style from "./BudgetSearch.module.css";

const numberRex = /^[0-9]+$/;
const BudgetSearch = (props) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const changeMinPrice = (e) => {
    let value = e.target.value;

    if (!numberRex.test(value) && value != "") {
      return;
    }

    console.log(value);
    setMinPrice(e.target.value);
  };
  const changMaxPrice = (e) => {};
  return (
    <>
      <div className={style["budget-input-panel"]}>
        <div className={style["budget-input-container"]}>
          <div className={style["min-input-box"]}>
            <Input
              size="large"
              placeholder="large size"
              prefix={<UserOutlined />}
              value={minPrice}
              onChange={changeMinPrice}
            />
          </div>
          <div className={style["max-input-box"]}>
            <Input
              size="large"
              placeholder="large size"
              prefix={<UserOutlined />}
              value={maxPrice}
            />
          </div>

          <div className={style["slide-input-box"]}></div>
          <Slider
            range={{
              draggableTrack: true,
            }}
            step={100}
            tooltip={"open"}
            max={500000}
            min={0}
            defaultValue={[20, 50]}
          />
          <div />
        </div>
      </div>
    </>
  );
};

export default BudgetSearch;
