import "rc-banner-anim/assets/index.css";
import React from "react";
import QueueAnim from "rc-queue-anim";
import BannerAnim from "rc-banner-anim";
import {Button, Card, Col, Row} from "antd";
import {banner} from "./data";
import {chartData} from "./data";
import {importantIngredients} from "./data";
import CountUp from "react-countup";
import {Line} from "@ant-design/plots";
import {useState} from "react";
import apiClient, {proxyImageURL} from "../../api";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {setSelectedRecipeSimlar} from "../../store/slices/recipeSlice";
// import './Banner.scss';
const {Element} = BannerAnim;
const {BgElement} = Element;

const Banner = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.auth.accessToken);
    const [todayRec, setTodayRec] = useState([]);

    const recipeClickHandle = (recSeq) => {
        //레시피 클릭했을 때,
        console.log(recSeq);

        console.log(todayRec);

        for (let i = 0; i < todayRec.length; i++) {
            if (todayRec[i].recSeq == recSeq) {
                dispatch(setSelectedRecipeSimlar(todayRec[i]));
                navigate("/recipe/" + recSeq);
                break;
            }
        }
    };

    useEffect(() => {
        apiClient
            .get("/recipes/daily", {
                headers: {
                    Authorization: accessToken
                },
                params: {}
            })
            .then((response) => {
                console.log(response.data);
                setTodayRec(response.data);
            })
            .catch((error) => {
                console.log("요청 에러");
                console.log(error);
            });
    }, []);

    const todayRecBanner = todayRec.map((item, i) => {
      const abc = "https://"
        return (
            <Element key={i}>
                <Row>
                    <Col span={16}>
                        <BgElement
                            key="bg"
                            className="banner-bg"
                            style={{
                                backgroundImage: `url(${proxyImageURL + item.recImg})`,
                                backgroundSize: `contain`,
                                // width: `100%`,
                                // height: `100%`,
                            }}/>
                    </Col>
                    <Col span={8}>
                    <QueueAnim key="text" className="seeconf-wrap">

                        <div className="seeconf-title">{item.recName}</div>
                        <p className="seeconf-en-name">{item.recSummary}</p>
                        <Button
                            className="banner-button"
                            onClick={() => recipeClickHandle(item.recSeq)}>
                            바로가기
                        </Button>
                    </QueueAnim>
                    </Col>
                </Row>

            </Element>
        );
    });

    return (
        <div className="banner page-wrapper">
            <div className="page">
                <Row gutter={32}>
                    <Col md={24} xs={24}>
                        <div className="content-wrap">
                            <BannerAnim type="across" duration={550} ease="easeInOutQuint">
                                {todayRecBanner}
                            </BannerAnim>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Banner;
