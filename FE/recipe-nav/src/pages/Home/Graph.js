import React, {useState, useEffect} from 'react';
import {Line} from '@ant-design/plots';

import {uniq, findIndex} from '@antv/util';

////////////////////////////////////
import {chartData} from './data';
////////////////////////////////////


const Graph = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch(
            'https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.' +
            'json'
        )
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };

    const COLOR_PLATE_10 = [
        '#5B8FF9',
        '#5AD8A6',
        '#5D7092',
        '#F6BD16',
        '#E8684A',
        '#6DC8EC',
        '#9270CA',
        '#FF9D4D',
        '#269A99',
        '#FF99C3'
    ];
    const container = document.getElementById('container');
    const config = {
        data: chartData,
        xField: 'year',
        yField: 'value',
        seriesField: 'category',
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
            }
        },
        color: COLOR_PLATE_10,
        point: {
            shape: ({category}) => {
                return category === 'Gas fuel'
                    ? 'square'
                    : 'circle';
            },
            style: ({year}) => {
                return {
                    r: Number(year) % 4
                        ? 0
                        : 3,
                };
            }
        }
    };

    return (<Line className='graph-bg' {...config}/>);
};

export default Graph;
