import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axiosClient from "../../api";
import { Button, Row, Col, Statistic } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";

const Myinfo = () => {
    const NaverButton = styled(Button)`
    margin-top: 10px;
    background-color: #A68D60;
    border-radius: 999px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    width: 70%;
    height: 60px;
    border: #A68D60;
    margin: 60px;
    font-weight: 700;
    font-size: 20px;
    line-height: 16px;
    color: #ffffff;
  
    :hover {
      background: #A68D60;
      color: #ffffff;
    }
  `;
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [myinfo, setMyinfo] = useState();
    const [loading, setLoading] = useState(false);

    const MyinfoHandle = ((e) => {
        setMyinfo(e);
        setLoading(true);
    })
    useEffect(() => {
        axiosClient
            .get('/my-infos', {
                headers: {
                    Authorization: accessToken
                }
            })
            .then((response) => {
                console.log(response.data);
                MyinfoHandle(response.data);
            })
            .catch((error) => {
                console.log("에러");
                console.log(error);
            });
    }, [])

    return (
        <div className="page-wrapper myinfo">
            <div className="page">

                {
                    loading
                        ? <Row className='contents-wrap'>
                            <Col span={24} className='content'>
                                <div className='name'>
                                    <span className='name-nickname'>
                                        {myinfo.userName}
                                    </span>
                                    님
                                </div>
                            </Col>
                            <Col span={24} className='content'>
                                <Row className='name'>
                                    <Col span={12}>
                                        나이
                                    </Col>
                                    <Col span={12}>
                                        {myinfo.userAge}
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24} className='content'>
                                <Row className='name'>
                                    <Col span={12}>
                                        성별
                                    </Col>
                                    <Col span={12}>
                                        {
                                            myinfo.userGender === null
                                                ? <span>몰라</span>
                                                : <span>{myinfo.userGender}</span>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <NaverButton>프로필 수정</NaverButton>
                            </Col>
                        </Row>
                        : <Row></Row>
                }

            </div>
        </div >
    );
}

export default Myinfo;