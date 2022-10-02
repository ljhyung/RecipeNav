import style from './ProfileEdit.module.css';
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
import apiClient from "../../api";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
const ProfileEdit = () => {
    const navigate = useNavigate();



    const accessToken = useSelector((state) => state.auth.accessToken);

    const onFinish = (values) => {
        console.log('Received values of form: ', values.username);

        apiClient
        .put("/my-infos", {
            userName: values.username,
            userAge: values.slider,
            userGender: values.gender,
        },
        {
            headers: {
                Authorization: accessToken,
              },
        }
        )
        .then((response) => {
          console.log(response);
          navigate('/mypage');
        })
        .catch((error) => {
          console.log("요청 에러");
          console.log(error);
        });
    }; 
    // 닉네임 성별 연령 보내기 -> 식자재 고르기 페이지로 이동

    
        return (

            <Row className={style.container}>
                <Col flex="auto" md={24} xs={0} className={style.sideImg}>
                </Col>
                <Col flex="500px" md={24} xs={24} className={style.main}>

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
                            <h1>프로필 수정</h1>
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

                            <SubmitButton htmlType="submit" >
                                변경사항 저장하기
                            </SubmitButton>

                        </ProfileForm>
                    </Row>
                </Col>
            </Row>
        );
    }


export default ProfileEdit;
