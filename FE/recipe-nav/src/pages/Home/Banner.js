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

// import './Banner.scss';
const { Element } = BannerAnim;
const { BgElement } = Element;

const Banner = () => {
  const bannerChildren = banner.map((item, i) => {
    const children = item.children.map((child, ii) => {
      const tag = child.tag === "button" ? "div" : child.tag || "p";
      const childrenToRender =
        child.tag === "button" ? (
          <Button>
            <a href={child.link} target="_blank">
              {child.children}
            </a>
          </Button>
        ) : (
          child.children
        );
      return React.createElement(
        tag,
        {
          key: ii.toString(),
          className: child.className,
          style: child.style || {},
        },
        childrenToRender,
      );
    });
    return (
      <Element key={i.toString()}>
        <BgElement
          key="bg"
          className="banner-bg"
          style={{
            backgroundImage: `url(${item.img})`,
          }}
        />
        <QueueAnim
          key="text"
          className={item.className}
          ease={["easeOutCubic", "easeInQuad"]}
          type={item.queueAnim || "bottom"}
        >
          {children}
        </QueueAnim>
      </Element>
    );
  });

  //그래프를 위한 config 설정 console.log(graph);
  const COLOR_PLATE_10 = [
    "#5B8FF9",
    "#5AD8A6",
    "#5D7092",
    "#F6BD16",
    "#E8684A",
    "#6DC8EC",
    "#9270CA",
    "#FF9D4D",
    "#269A99",
    "#FF99C3",
  ];
  const config = {
    data: chartData,
    xField: "year",
    yField: "value",
    seriesField: "category",
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: COLOR_PLATE_10,
    point: {
      shape: ({ category }) => {
        return category === "Gas fuel" ? "square" : "circle";
      },
      style: ({ year }) => {
        return {
          r: Number(year) % 4 ? 0 : 3,
        };
      },
    },
  };

  //그래프를 위한 config 설정 끝.

  const chartChildren = importantIngredients.map((item, i) => {
    const ingredient = item;
    return (
      <Col md={12} xs={24} className="chart-element">
        <Card
          className="chartCard"
          bordered={false}
          bodyStyle={{
            padding: 10,
          }}
        >
          <img src={item.imgUrl} />

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
                &nbsp;{item.priceDiff}{" "}
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
          <Col md={16} xs={24}>
            <div className="content-wrap">
              <h1>주요뉴스</h1>
              <BannerAnim type="across" duration={550} ease="easeInOutQuint">
                {bannerChildren}
              </BannerAnim>
            </div>
          </Col>
          <Col md={8} xs={24}>
            <div className="content-wrap">
              <h1>주요지표</h1>
              <Line {...config} />
              <Row>{chartChildren}</Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Banner;
