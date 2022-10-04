import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";

const PriceBaseHistogram = (props) => {
  const [data, setData] = useState([]);

  const recipes = props.recipes;

  let arr = new Array();
  let cost = 0;

  const datas = recipes
    .map((recipe) => {
      cost = recipe.recPrice;
      if (cost === null) {
        cost = 0;
      }
      cost = Math.round(cost / 1000) * 1000;

      return { cost: cost, num: 1 };
    })
    .sort((a, b) => {
      return a.cost - b.cost;
    });

  console.log(datas);
  let before = datas[0];
  let count = 1;
  for (let i = 1; i < datas.length; i++) {
    if (before.cost == datas[i].cost) {
      count++;
    } else {
      arr.push({ ...before, num: count });
      before = datas[i];
      count = 1;
    }
  }

  arr.push({ ...before, num: count });

  const config = {
    data: arr,
    padding: "auto",
    xField: "cost",
    yField: "num",
    xAxis: {
      // type: 'timeCat',
      tickCount: 1000,
    },
    smooth: true,
    color: "#a8ddb5",
  };

  return <Column {...config} />;
};

export default PriceBaseHistogram;
