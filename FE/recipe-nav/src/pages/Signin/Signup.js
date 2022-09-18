import style from './Signup.module.css';
import "antd/dist/antd.css";
import {useState} from 'react';
import 'antd/dist/antd.css';
import {
    Button,
    Form,
    Slider,
    Input,
    Radio,
    Row,
    Image
} from 'antd';
import styled from "styled-components";

const ProfileForm = styled(Form)`
background-color: #EAF2CE;

border-radius: 30px;
box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

border: #EAF2CE;

position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
padding: 50px;
margin-top: 50px;
width: 400px;
`;

//로그인 버튼
const Signup = () => {
    const [signup, setSignup] = useState(0);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setSignup(1);
    };

    if (signup == 0) {

        return (
            <div className={style.container}>
                < Row justify="center">
                    <Image width={200} src="/Logo.png"/>
                </Row>
                <Row justify="center">
                    <div className={style.Title}>
                        Recipe Nav
                    </div>
                </Row>
                <ProfileForm
                    size={'large'}
                    colon={false}
                    name="normal_login"
                    className="login-form"
                    layout={'vertical'}
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinish}>

                    <Form.Item
                        name="username"
                        label="닉네임"
                        rules={[{
                                required: true,
                                message: 'Please input your Username!'
                            }
                        ]}>
                        <Input placeholder="지능"/>
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
                                0 : '0',
                                20 : '20',
                                40 : '40',
                                60 : '60',
                                80 : '80',
                                100 : '100+'
                            }}/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className={style.loginFormButton}>
                        회원 등록 하기
                    </Button>
                </ProfileForm>
            </div>
        );
    } else {
        return (

        < div className = 'containerBig' > <h1>HI FUCK WORLD</h1>
            <Button type="primary" htmlType="submit" className={style.loginFormButton}>
                회원 등록 하기
            </Button>
        </div>
        );
    }
};

export default Signup;
