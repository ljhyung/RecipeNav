import style from './Signup.module.css';
import SelectIngredient from './SelectIngredient.js'
import "antd/dist/antd.css";
import { useState } from 'react';
import 'antd/dist/antd.css';
import {
    Button,
    Form,
    Slider,
    Input,
    Radio,
    Row,
    Col
} from 'antd';
import styled from "styled-components";

const SubmitButton = styled(Button)`
text-align: center;
width: 300px;
background: rgba(166, 141, 96, 1);
color: #EAF2CE; 

:hover {
    color: #D3D9BD;
    background: #8F7951;
    border: #8F7951;
}
`;

const ProfileForm = styled(Form)`
background-color: #EAF2CE;

border-radius: 30px;
box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

border: #EAF2CE;


padding: 50px;
margin-top: 50px;
width: 400px;
`;

//로그인 버튼
const Signup = () => {
    const [userstate, setUserstate] = useState(0);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setUserstate(1)
    }; // 닉네임 성별 연령 보내기 -> 식자재 고르기 페이지로 이동

    if (userstate === 1) {
        return (
            <SelectIngredient />
        );
    } else {
        return (

            <Row className={style.container}>
                <Col md={12} xs={0} flex="auto" className={style.sideImg}>
                    안녕하세요!
                </Col>
                <Col md={12} xs={24} flex="500px" className={style.main}>

                    <Row justify='center'>

                        <ProfileForm
                            size={'large'}
                            colon={false}
                            name="normal_login"
                            className={style.signupForm}
                            layout={'vertical'}
                            initialValues={{
                                remember: true
                            }}
                            onFinish={onFinish}>
                            <h1>필수 입력 내용</h1>
                            <Form.Item
                                name="username"
                                label="닉네임"
                                rules={[{
                                    required: true,
                                    message: 'Please input your Username!'
                                }
                                ]}>
                                <Input placeholder="닉네임 입력하세요" />
                            </Form.Item>

                            <Form.Item
                                label="성별"
                                name="sex"
                                rules={[{
                                    required: true,
                                    message: 'Please input your Username!'
                                }
                                ]}>
                                <Radio.Group>
                                    <Radio.Button value="Male">남</Radio.Button>
                                    <Radio.Button value="Female">여</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                name="slider"
                                label="연령"
                                rules={[{
                                    required: true,
                                    message: 'Please input your Username!'
                                }
                                ]}>
                                <Slider
                                    marks={{
                                        0: '0',
                                        20: '20',
                                        40: '40',
                                        60: '60',
                                        80: '80',
                                        100: '100+'
                                    }} />
                            </Form.Item>

                            <SubmitButton htmlType="submit">
                                회원 등록 하기
                            </SubmitButton>

                        </ProfileForm>
                    </Row>
                </Col>
            </Row>
        );
    }
};

export default Signup;
