import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import apiClient from "../../api";
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import {chartData} from './data';
import Search from 'antd/lib/input/Search';

const IngredientGraph = (props) => {
  const [data, setData] = useState([]);
  console.log(props)
  const ingredientSeq = useSelector((state) => state.ingredient.selectedIngredient.ingSeq);
  // const ingredientSeq = props.ingredientSeq;
  console.log(ingredientSeq)
  const accessToken = useSelector((state) => state.auth.accessToken);
  

  useEffect(() => {
    apiClient
        .get(`/ingredients/price-log/${ingredientSeq}`, {
            headers: {
                Authorization: accessToken
            },
            params: {}
        })
        .then((response) => {
            setData(response.data);
            //   dispatch(setRecipes(response.data.content));
        })
        .catch((error) => {
            console.log("요청 에러");
            console.log(error);
        });

  }, [ingredientSeq]);

 

  const config = {
      data: data,
      xField: 'ingDate',
      yField: 'ingAvgCost',
      seriesField: 'category',
      yAxis: {
          label: {

              formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
          }
      },
      legend: {
          position: 'top'
      },
      color: ['#1979C9', '#D62A0D', '#FAA219'],
      title: {
          autoRotate: true,
          position: 'center',
      }
  };

  return (
    <>
        <Line className='graph-bg' {...config} />
    </>
  );
};

export default IngredientGraph;