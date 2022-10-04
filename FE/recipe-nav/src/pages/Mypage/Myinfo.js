import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../../api";
import { Button, Row, Col, Statistic, Spin } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import style from "./Myinfo.module.css";
const Myinfo = () => {
  const navigate = useNavigate();

  const NaverButton = styled(Button)`
    margin-top: 10px;
    background-color: #a68d60;
    border-radius: 999px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    width: 70%;
    height: 60px;
    border: #a68d60;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 20px;
    line-height: 16px;
    color: #ffffff;

    :hover {
      background: #a68d60;
      color: #ffffff;
    }
  `;
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [myinfo, setMyinfo] = useState();
  const [loading, setLoading] = useState(false);

  const moveToProfileEdit = () => {
    navigate("/profile-edit");
  };

  const MyinfoHandle = (e) => {
    setMyinfo(e);
    setLoading(true);
  };
  useEffect(() => {
    axiosClient
      .get("/my-infos", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log("내정보");
        console.log(response.data);
        MyinfoHandle(response.data);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }, []);

  return (
    <div className="page-wrapper myinfo">
      <div className="page">
        <h2>프로필</h2>
        {loading ? (
          <div className={style["myinfo-box"]}>
            <Row className="contents-wrap">
              <Col span={24} className="content">
                <div className="name">
                  <span className="name-nickname">{myinfo.userName}</span>님
                </div>
              </Col>
              <Col span={24} className="content">
                <Row className="name">
                  <Col span={12}>나이</Col>
                  <Col span={12}>{myinfo.userAge}</Col>
                </Row>
              </Col>
              <Col span={24} className="content">
                <Row className="name">
                  <Col span={12}>성별</Col>
                  <Col span={12}>
                    {myinfo.userGender === null ? (
                      <span>몰라</span>
                    ) : (
                      <span>{myinfo.userGender}</span>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <NaverButton onClick={moveToProfileEdit}>
                  프로필 수정
                </NaverButton>
              </Col>
            </Row>
          </div>
        ) : (
          <Row>
            {" "}
            <Spin tip="Loading..."></Spin>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Myinfo;
