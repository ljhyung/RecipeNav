import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import apiClient from "../../api";
import { useSelector } from "react-redux";
import Search from "antd/lib/input/Search";

const Graph = (props) => {
  let data = props.data;
  let formattedDate = [];

  if (data == null) {
    data = [];
  }
  for (let i = 0; i < data.length; i++) {
    let category = "";
    let cost = 0;

    category = "min";
    cost = data[i].ingMinCost;
    formattedDate.push({
      ingDate: data[i].ingDate,
      ingCost: cost,
      category: category,
    });
    category = "avg";
    cost = data[i].ingAvgCost;
    formattedDate.push({
      ingDate: data[i].ingDate,
      ingCost: cost,
      category: category,
    });
    category = "max";
    cost = data[i].ingMaxCost;
    formattedDate.push({
      ingDate: data[i].ingDate,
      ingCost: cost,
      category: category,
    });
  }

  const config = {
    data: formattedDate,
    xField: "ingDate",
    yField: "ingCost",
    seriesField: "category",
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: {
      position: "top",
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
    title: {
      autoRotate: true,
      position: "center",
    },
  };

  return (
    <>
      {formattedDate !== null && formattedDate.length > 0 ? (
        <Line className="graph-bg" {...config} />
      ) : (
        <h1>...</h1>
      )}
    </>
  );
};

export default Graph;
