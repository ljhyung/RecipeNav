import React, { useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { Routes, useNavigate, Link, Route, BrowserRouter as Router } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import style from './Mypage.module.css'; // eslint-disable-line no-unused-vars
import { Button, Row, Image, Col, Divider, Card, Layout } from 'antd';
import styled from "styled-components";
import "antd/dist/antd.css";
const { Meta } = Card;

const { Content } = Layout;

const SubmitButton = styled(Button)`
text-align: center;
width: auto;
background: #9CD918;
height: auto;

color: #EAF2CE; 
z-index: 1;

font-family: 'Inter';
font-style: normal;
font-weight: 900;
font-size: 40px;

box-shadow: 4px 6px 6px 2px rgba(0, 0, 0, 0.25);
border-radius: 999px;
border: #EAF2CE;
:hover {
    color: #42A54C;
    background: #42A54C;
    border: #42A54C;
}
`;

const InfoTitelCard = styled(Card)`
text-align: center;
width: auto;
background: #EAF2CE;
height: auto;
border-radius : 40px;
margin-top : 20px;


color: #000000; 
z-index: 1;

font-family: 'Inter';
font-style: normal;
font-weight: 900;
font-size: 40px;
}
`;





const Mypage = () => {
  // 프로필 수정페이지로 이동
  const navigate = useNavigate();

  const moveToProfileEdit =() => { 
    navigate('/profile-edit')
  };

  
  const user_name = '김싸피'
  const user_gender = '남'
  const user_age = '33'
  
    
  return (
    <>
      <div className={style.Mypage}>
        <div className={style.Background}> 
          <div className={style.Layout}>
            
              <div className={style.Myinfos}>
                <Row>
                  <Col className={style.Userinfo} span={8} offset={1}>
                    <InfoTitelCard justify="space-evenly">
                      내 정보
                    </InfoTitelCard>
                  
                      <div>
                        <img className={style.UserImage} src="https://placeimg.com/200/100/any/grayscale" alt='userimage'/>
                      </div>
                      <div className={style.UserName}>
                        {user_name}
                      </div>
                      <div className={style.UserGender}>
                        {user_gender}
                      </div>
                      <div className={style.UserAge}>
                        {user_age}
                      </div>
                    
                      <div className="ProfileEdit">
                          <SubmitButton onClick={moveToProfileEdit}>
                            프로필 수정
                          </SubmitButton>
                      </div>
                  
                  </Col>
                    
                  <Col className={style.UserContents} span={11} offset={1}>
                  
                    <span className="Recipes">
                      <span className="Myrecipes">
                        <InfoTitelCard className={style.MyrecipesTitle}>
                        즐겨찾는 레시피
                        </InfoTitelCard>
                        <Row className={style.MyrecipesImage}>
                          <Col>
                            <Card
                              style={{
                                  width: 240
                              }}
                              cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                              <Meta title="제육볶음" description="5000원" /></Card>
                          </Col>
                          <Col>
                            <Card
                              style={{
                                  width: 240
                              }}
                              cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                              <Meta title="제육볶음" description="5000원" /></Card>
                          </Col>
                          <Col>
                            <Card
                              style={{
                                  width: 240
                              }}
                              cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                              <Meta title="제육볶음" description="5000원" /></Card>
                          </Col>
                          <Col>
                            <Card
                              style={{
                                  width: 240
                              }}
                              cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                              <Meta title="제육볶음" description="5000원" /></Card>
                          </Col>      
                        </Row>
                      </span>
                      <Divider />
                      <Col className={style.RecentRecipe}>
                        <InfoTitelCard className={style.RecentRecipeTitle}>
                        최근 조회 레시피
                        </InfoTitelCard>
                        <Row>
                          <Col>
                              <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="제육볶음" description="5000원" /></Card>
                          </Col>
                          <Col>
                              <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="제육볶음" description="5000원" /></Card>
                          </Col>
                          <Col>
                              <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="제육볶음" description="5000원" /></Card>
                            </Col>
                            <Col>
                              <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="제육볶음" description="5000원" /></Card>
                            </Col> 
                        </Row>
                      </Col>
                    </span>
                    <Divider />
                    <Col className={style.Ingredient}>
                      <Col className={style.Myingredient}>
                        <InfoTitelCard className={style.MyingredientTitle}>
                        즐겨찾는 식재료
                        </InfoTitelCard>
                          <Row>
                            <Col>
                                <Card
                                  style={{
                                      width: 240
                                  }}
                                  cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                  <Meta title="제육볶음" description="5000원" /></Card>
                            </Col>
                            <Col>
                                <Card
                                  style={{
                                      width: 240
                                  }}
                                  cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                  <Meta title="제육볶음" description="5000원" /></Card>
                            </Col>
                            <Col>
                              <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="제육볶음" description="5000원" /></Card>
                            </Col>
                            <Col>
                              <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="제육볶음" description="5000원" /></Card>
                            </Col>
                          </Row>  
                      </Col>
                      <Divider />
                      <Col className={style.Rencentingredient}>
                        <InfoTitelCard className={style.RencentIngredientTitle}>
                          최근 조회 식재료
                        </InfoTitelCard>
                          <Row>
                            <Col>
                                <Card
                                  style={{
                                      width: 240
                                  }}
                                  cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                  <Meta title="제육볶음" description="5000원" /></Card>
                            </Col>
                            <Col>
                                <Card
                                  style={{
                                      width: 240
                                  }}
                                  cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                  <Meta title="제육볶음" description="5000원" /></Card>
                            </Col>
                            <Col>
                              <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="제육볶음" description="5000원" /></Card>
                            </Col>
                            <Col>
                              <Card
                                style={{
                                    width: 240
                                }}
                                cover={<img alt="exapmle" src="https://placeimg.com/200/100/any/grayscale" />}>
                                <Meta title="제육볶음" description="5000원" /></Card>
                            </Col>
                          </Row>  
                      </Col>
                    </Col>  
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Mypage;