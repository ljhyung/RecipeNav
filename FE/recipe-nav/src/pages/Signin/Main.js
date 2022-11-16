import style from "./Main.module.css";
import {Button, Row, Image, Col} from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import {nanoid} from "nanoid";
import tteokboeky from "../../assets/tteokboeky.jpg";

const GoogleButton = styled(Button)`
  margin-top: 10px;
  background-color: #eeeeee;
  border-radius: 999px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  width: 80%;
  height: 60px;
  border: #eeeeee;

  font-weight: 700;
  font-size: 20px;
  line-height: 16px;
  color: black;

  :hover {
    background: #ffffff;
    color: black;
  }
`;

const NaverButton = styled(Button)`
  margin-top: 10px;
  background-color: rgba(3, 199, 90, 1);
  border-radius: 999px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  width: 80%;
  height: 60px;
  border: rgba(3, 199, 90, 1);

  font-weight: 700;
  font-size: 20px;
  line-height: 16px;
  color: #ffffff;

  :hover {
    background: green;
    color: #ffffff;
  }
`;

//로그인 버튼
const Main = () => {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
    const authUrl = process.env.REACT_APP_NAVER_AUTH_URL;
    const redirectUrl = process.env.REACT_APP_NAVER_REDIRECT_URL;

    const state = nanoid();

    let requestUrl = authUrl;
    requestUrl += "?response_type=code";
    requestUrl += `&client_id=${clientId}`;
    requestUrl += `&state=${state}`;
    requestUrl += `&redirect_uri=${redirectUrl}`;
    //requestUrl

    return (
        <Row className={style.container}>
            <Col md={16} xs={0} flex="auto" className={style.sideImg}>
                <img alt="main" src={tteokboeky} className={style.mainImg}/>
            </Col>
            <Col md={8} xs={24} className={style.main}>
                <Row justify="center">
                    <Col span={24} className={style.Signin}></Col>
                    <Col span={24}>
                        <img width={200} src="/Logo.png" alt="logo"/>
                    </Col>
                    <Col span={24} className={style.Title}>
                        <span >
                            Recipe Nav
                        </span>
                    </Col>
                    <Col span={24}>
                        <a href={requestUrl}>
                            <NaverButton>Naver 계정으로 로그인</NaverButton>
                        </a>
                        <div className={style.Copyright}>RecipeNav ©2022 Created by bb</div>

                    </Col>
                </Row>
            </Col>

        </Row>
    );
};

export default Main;
