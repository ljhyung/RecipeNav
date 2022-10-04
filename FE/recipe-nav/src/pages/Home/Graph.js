import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import apiClient from "../../api";
import { useSelector } from 'react-redux';
import Search from 'antd/lib/input/Search';

const Graph = (props) => {
    const [data, setData] = useState([]);
    const ingredientSeq = props.ingredientSeq;
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        apiClient
            .get("/ingredients/price-log/separate/" + ingredientSeq, {
                headers: {
                    Authorization: accessToken
                },
                params: {}
            })
            .then((response) => {
                if(response.data.length > 300){
                    setData(response.data.slice(-300))
                    console.log(response.data.slice(-300))
                }
                else{
                    setData(response.data);
                }
            })
            .catch((error) => {
                console.log("요청 에러");
                console.log(error);
            });
    }, [ingredientSeq]);

    const config = {
        data: data,
        xField: 'ingDate',
        yField: 'ingCost',
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

export default Graph;