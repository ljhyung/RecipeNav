import "rc-banner-anim/assets/index.css";
import React from "react";
import QueueAnim from "rc-queue-anim";
import BannerAnim from "rc-banner-anim";
import { Button, Card, Col, Row } from "antd";
import { banner } from "./data";
import { chartData } from "./data";
import { importantIngredients } from "./data";
import CountUp from "react-countup";
import { Line } from "@ant-design/plots";
import { useState } from "react";
import apiClient, { proxyImageURL } from "../../api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  setRecipes,
  setSelectedRecipe,
  setPage,
  setSize,
  setTotalItem,
  setSearchString,
} from "../../store/slices/recipeSlice";
// import './Banner.scss';
const { Element } = BannerAnim;
const { BgElement } = Element;

const Banner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);
  const [todayRec, setTodayRec] = useState([]);

  const recipeClickHandle = (recSeq) => {
    //레시피 클릭했을 때,
    console.log(recSeq);

    dispatch(setSelectedRecipe(recSeq));

    navigate("/recipe/" + recSeq);
  };

  useEffect(() => {
    apiClient
      .get("/recipes/daily", {
        headers: {
          Authorization: accessToken,
        },
        params: {},
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
    return (
      <Element>
        <BgElement
          key="bg"
          className="banner-bg"
          style={{
            backgroundImage: `url(${item.recImg})`,
            backgroundSize: `contain`,
          }}
        />
        <QueueAnim key="text" className="seeconf-wrap">
          <div className="seeconf-title">{item.recName}</div>
          <Button
            className="banner-button"
            onClick={() => recipeClickHandle(item.recSeq)}
          >
            바로가기
          </Button>
          <p className="seeconf-en-name">{item.recSummary}</p>
        </QueueAnim>
      </Element>
    );
  });

  const chartChildren = importantIngredients.map((item, i) => {
    return (
      <Col md={12} xs={24} className="chart-element">
        <Card
          className="chartCard"
          bordered={false}
          bodyStyle={{
            padding: 10,
          }}
        >
          <img src={proxyImageURL + item.imgUrl} />

          <div className="content">
            <p className="title">{item.title}</p>
            <p className="number">
              <CountUp
                start={0}
                end={item.price}
                duration={2.75}
                useEasing="useEasing"
                useGrouping="useGrouping"
                separator=","
              />

              <span className={item.priceDiff > 0 ? "up" : "down"}>
                &nbsp;{item.priceDiff}
                {Math.ceil((item.priceDiff / item.price) * 100)}%
              </span>
            </p>
          </div>
        </Card>
      </Col>
    );
  });

  return (
    <div className="banner page-wrapper">
      <div className="page">
        <Row gutter={32}>
          <Col md={24} xs={24}>
            <div className="content-wrap">
              <h1>오늘의 레시피</h1>
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
