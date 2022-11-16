import {Button, Col, Row} from "antd";
import {useEffect, useState} from "react";
import Graph from "./Graph";
import {useSelector} from "react-redux";
import apiClient from "../../api";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import { Navigate } from "react-router-dom";

const Page3 = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);

    const [data, setData] = useState([]);
    const [pick, setPick] = useState(0);

    useEffect(() => {
        apiClient
            .get("/ingredients/topgainers", {
                headers: {
                    Authorization: accessToken
                },
                params: {}
            })
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log("요청 에러");
                console.log(error);
            });
    }, []);

    const clickEvent = (pickNum) => {
        setPick(pickNum);
    };

    const recipeClickHandle = (recSeq) => {
        //레시피 클릭했을 때,
        console.log(recSeq);
        Navigate("/ingredient/" + recSeq);
    };

    const Other = data.map((item, i) => {
        if (i < 7 && i != pick) {
            return (
                <Col md={12} xs={24} onClick={() => clickEvent(i)} key={i} className="other">
                    <div
                        style={{
                            width: 120,
                            height: 120,
                            backgroundImage: `url(${item.ingImg})`,
                            backgroundSize: `contain`,
                            backgroundRepeat: `no-repeat`,
                            backgroundPosition: `center`
                        }}/>
                    <div className="other-title">{item.ingName}</div>
                    {
                        item.ingPriceRate > 0
                            ? (
                                <div className="other-priceRate-up">
                                    <CaretUpOutlined/> {
                                        item
                                            .ingPriceRate
                                            .toFixed(2)
                                    }%
                                </div>
                            )
                            : (
                                <div className="other-priceRate-down">
                                    <CaretDownOutlined/> {
                                        item
                                            .ingPriceRate
                                            .toFixed(2)
                                    }%
                                </div>
                            )
                    }
                </Col>
            );
        }
    });

    const Test2 = () => {
        return (<Col md={12} xs={24}>
            <Row>{Other}</Row>
        </Col>);
    };

    const contentChart = data.map((item, i) => {
        if (i == pick) {
            console.log(pick);
            return (
                <Col md={12} xs={24} className="chart" key={i}>
                    <Row>
                        <Col span={5}>
                            <div
                                key="bg"
                                className="chart-bg"
                                style={{
                                    backgroundImage: `url(${item.ingImg})`,
                                    backgroundSize: `contain`
                                }}
/>
                        </Col>
                        <Col span={19}>
                            <div className="chart-title">{item.ingName}</div>

                            {
                                item.ingPriceRate > 0
                                    ? (
                                        <div className="chart-priceRate-up">
                                            <CaretUpOutlined/> {
                                                item
                                                    .ingPriceRate
                                                    .toFixed(2)
                                            }%
                                        </div>
                                    )
                                    : (
                                        <div className="chart-priceRate-down">
                                            <CaretDownOutlined/> {
                                                item
                                                    .ingPriceRate
                                                    .toFixed(2)
                                            }%
                                        </div>
                                    )
                            }
                        </Col>
                        <Col span={24}>
                            <Graph key="graph" ingredientSeq={data[pick].ingSeq}/>
                        </Col>
                    </Row>
                </Col>
            );
        }
    });

    return (
        <div className="page3 page-wrapper">
            <div className="page">
                <div className="contents-wrap">
                    <h1>
                        실시간 급등 식재료
                        <CaretUpOutlined
                            style={{
                                color: "red"
                            }}/>
                    </h1>
                    <Row gutter={[14, 14]}>
                        {contentChart}
                        <Test2/>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default Page3;
