import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axiosClient from "../../api";
import { Button, Row, Col, Statistic } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import { useNavigate } from 'react-router-dom';

const Myingredients = () => {
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
        navigate("/ingredients/" + recSeq);
    };

    useEffect(() => {
        axiosClient
            .get('/my-infos/ingredients', {
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

    const myIngredientsCard = myingredients.map((item, i) => {
        return (
            <Col className="card-item">
                <div onClick={() => recipeClickHandle(item.ingSeq)} className="card-item-link">
                    <div
                        className="card-item-img"
                        style={{
                            width: 120,
                            height: 120,
                            background: `url("${item.ingImg}")`,
                            borderRadius: `100%`,
                            backgroundSize: `contain`,
                            backgroundRepeat: `no-repeat`,
                            backgroundPosition: `center`
                        }} />
                    <div className="card-item-title">{item.ingName}</div>
                </div>
            </Col>
        );
    })

    return (
        <div className="page-wrapper myinfo">
            <div className="page">
                {
                    loading
                        ? <Row className='contents-wrap'>
                            {myIngredientsCard}
                        </Row>
                        : <Row></Row>
                }

            </div>
        </div >
    );
}

export default Myingredients;