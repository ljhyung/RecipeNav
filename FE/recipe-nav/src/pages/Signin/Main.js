import style from './Main.module.css';
import { Button, Row, Image, Col } from 'antd';
import styled from "styled-components";
import "antd/dist/antd.css";

const GoogleButton = styled(Button)`
margin-top: 10px;
background-color: #EEEEEE;
border-radius: 999px;
box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
width: 400px;
height: 60px;
border: #EEEEEE;

font-weight: 700;
font-size: 20px;
line-height: 16px;
color: black;

:hover {
    background: #FFFFFF;
    color: black;
}
`;

const NaverButton = styled(Button)`
margin-top: 10px;
background-color: rgba(3, 199, 90, 1);
border-radius: 999px;
box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
width: 400px;
height: 60px;
border: rgba(3, 199, 90, 1);

font-weight: 700;
font-size: 20px;
line-height: 16px;
color: #FFFFFF;

:hover {
    background: green;
    color: #FFFFFF;
}
`;

//로그인 버튼
const Main = () => {
    return (
        <Row className={style.container}>
            <Col flex="auto" className={style.sideImg}>
                안녕하세요!
            </Col>

            <Col flex="500px" className={style.main}>
                <Row justify='center' className={style.Signin}>
                </Row>
                <Row justify='center'>
                    <Image width={200} src="/Logo.png" />
                </Row>
                <Row justify='center' className={style.Title}>
                    Recipe Nav
                </Row>
                <Row justify='center'>
                    <NaverButton>Naver 계정으로 로그인</NaverButton>
                    <GoogleButton>Google 계정으로 로그인</GoogleButton>

                    <div className={style.Copyright}>
                        RecipeNav ©2022 Created by bb
                    </div>
                </Row>

            </Col >

        </Row>
    );
};

export default Main;
