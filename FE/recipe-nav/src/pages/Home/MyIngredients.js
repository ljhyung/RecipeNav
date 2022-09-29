import {Col, Row} from "antd";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Graph from "./Graph"
import {page1} from './data';
import apiClient from "../../api";
import { useEffect } from "react";

const MyIngredients = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const user = useSelector((state) => state.auth.user);
    console.log(user);

    useEffect(()=>{
        apiClient
          .get("/my-infos/ingredients", {
            headers: {
              Authorization: accessToken,
            },
          })
          .then((response) => {
            console.log(response);
            // dispatch(setMyIngredients(response.data.content));
          })
          .catch((error) => {
            console.log("요청 에러");
            console.log(error);
          });
      },[])


    const test = page1
        .children
        .map((item, i) => {
            return (
                <Col md={4} xs={12} className="page2-item">
                    <a className="page2-item-link">
                        <div
                            className="page2-item-img"
                            style={{
                                boxShadow: `0 16px 32px ${item.shadowColor}`
                            }}>
                            <img src={item.src} alt="img"/>
                        </div>
                        <div className="page2-item-title">{item.title}</div>
                    </a>
                </Col>
            );
        })
    return (
        <div className="page2 page-wrapper">
            <div className="page">
                <div className="contents-wrap">
                    <h1>
                        내 관심 식자재
                    </h1>
                    <Row className="contents">
                        {test}
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default MyIngredients;
