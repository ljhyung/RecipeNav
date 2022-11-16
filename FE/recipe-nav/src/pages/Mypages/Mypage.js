import React, { useEffect } from "react"; // eslint-disable-line no-unused-vars
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  useNavigate,
  Link,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"; // eslint-disable-line no-unused-vars
import axiosClient from "../../api";
import style from "./Mypage.module.css"; // eslint-disable-line no-unused-vars
import { Button, Row, Image, Col, Divider, Card, Layout } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";

const { Meta } = Card;

const { Content } = Layout;

const SubmitButton = styled(Button)`
  text-align: center;
  width: auto;
  background: #9cd918;
  height: auto;

  color: #eaf2ce;
  z-index: 1;

  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-size: 40px;

  box-shadow: 4px 6px 6px 2px rgba(0, 0, 0, 0.25);
  border-radius: 999px;
  border: #eaf2ce;
  :hover {
    color: #42a54c;
    background: #42a54c;
    border: #42a54c;
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

const Mypage = (props) => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  // 나의 정보 조회
  axiosClient
    .get("/my-infos", {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      console.log("내정보 출력");
      console.log(response);
      const myinformation = response;
      console.log(myinformation);
    })
    .catch((error) => {
      console.log("에러");
      console.log(error);
    });

  // 즐겨찾기 한 식자재 리스트 조회
  axiosClient
    .get("/my-infos/ingredients", {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      console.log(response);
      const myingredients = response;
      console.log(myingredients);
    })
    .catch((error) => {
      console.log("에러");
      console.log(error);
    });

  // 즐겨찾기 한 레시피 리스트 조회
  axiosClient
    .get("/my-infos/recipes", {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      console.log(response);
      const myingredients = response;
      console.log(myingredients);
    })
    .catch((error) => {
      console.log("에러");
      console.log(error);
    });

  // 프로필 수정페이지로 이동
  const navigate = useNavigate();

  const moveToProfileEdit = () => {
    navigate("/profile-edit");
  };

  const user_Name = "김싸피";
  const user_Gender = "남";
  const user_Age = "33";
  const myinformation = myinformation;

  return (
    <>
      <div className={style.Mypage}>
        <div className={style.Background}>
          <div className={style.Layout}>
            <div className={style.Myinfos}>
              <Row>
                <Col className={style.Userinfo} span={8} offset={1}>
                  <InfoTitelCard justify="space-evenly">내 정보</InfoTitelCard>
                  <div>
                    <img className={style.UserImage} alt="userimage" />
                  </div>
                  <div className={style.UserName}>
                    {this.myinformation.data.userName}
                  </div>
                  <div className={style.UserGender}>{user_Gender}</div>
                  <div className={style.UserAge}>{user_Age}</div>
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
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
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
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
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
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
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
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
                        </Col>
                        <Col>
                          <Card
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="exapmle"
                                src="https://placeimg.com/200/100/any/grayscale"
                              />
                            }
                          >
                            <Meta title="제육볶음" description="5000원" />
                          </Card>
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
