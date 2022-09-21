import style from './SelectIngredient.module.css';
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Card, Col, Row } from 'antd';
import { Layout } from 'antd';
import styled from 'styled-components';
const { Meta } = Card;

const { Content } = Layout;

const SubmitButton = styled(Button)`
text-align: center;
width: auto;
background: #9CD918;
height: auto;

color: #EAF2CE; 
position: fixed; 
bottom: 32px;  
z-index: 1;

font-family: 'Inter';
font-style: normal;
font-weight: 900;
font-size: 40px;

box-shadow: 4px 6px 6px 2px rgba(0, 0, 0, 0.25);
border-radius: 999px;
border: #EAF2CE;
:hover {
    color: #D3D9BD;
    background: #9ACF26;
    border: #9ACF26;
}
`;

//첫페이지

const SelectIngredient = () => {
    return (
        <Layout>

            <Content className={style.siteLayout}>

                <div className={style.Content}>
                    나는 그걸 낭만이라고 부르기로 했다.
                    <Row gutter={[16, 16]} justify="space-evenly" className={style.Cards}>
                        <SubmitButton > 그냥 정이라고 하자</SubmitButton>

                        <Col>

                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="삼겹살" description="사랑이담긴고기" /></Card>
                        </Col>
                    </Row>

                </div>
                <div style={{ paddingTop: 140 }}></div>
            </Content>
        </Layout>
    );

};

export default SelectIngredient;
