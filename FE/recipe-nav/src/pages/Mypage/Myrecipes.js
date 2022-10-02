import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axiosClient from "../../api";
import { Button, Row, Col, Statistic } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import { useNavigate } from 'react-router-dom';

const Myrecipes = () => {
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [myingredients, setMyingredients] = useState([]);
    const [loading, setLoading] = useState(false);

    const MyingredientsHandle = ((e) => {
        setMyingredients(e);
        setLoading(true);
        console.log("핸들러 확인용")
    })

    const recipeClickHandle = (recSeq) => {
        //레시피 클릭했을 때,
        console.log(recSeq);
        navigate("/recipe/" + recSeq);
    };

    useEffect(() => {
        axiosClient
            .get('/my-infos/recipes', {
                headers: {
                    Authorization: accessToken
                }
            })
            .then((response) => {
                console.log(response.data);
                MyingredientsHandle(response.data);
            })
            .catch((error) => {
                console.log("에러");
                console.log(error);
            });
    }, [])

    const MyrecipesCard = myingredients.map((item, i) => {
        return (
            <Col className="card-item">
                <div onClick={() => recipeClickHandle(item.recSeq)} className="card-item-link">
                    <div
                        className="card-item-img"
                        style={{
                            width: 120,
                            height: 120,
                            background: `url("${item.recImg}")`,
                            backgroundSize: `contain`,
                            backgroundRepeat: `no-repeat`,
                            backgroundPosition: `center`
                        }} />
                    <div className="card-item-title">{item.recName}</div>
                </div>
            </Col>
        );
    })

    return (
        <div className="page-wrapper myinfo">
            <div className="page">
            <h2>나의 레시피</h2>
                {
                    loading
                        ? <Row justify="center" gutter={[4,4]} className='contents-wrap'>
                            {MyrecipesCard}
                        </Row>
                        : <Row></Row>
                }

            </div>
        </div >
    );
}

export default Myrecipes;