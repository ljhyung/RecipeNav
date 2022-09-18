import Signin from './Signin/Signin.js'
import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Layout, Menu} from "antd";
//첫페이지

const {Header, Content, Footer} = Layout;

const Page2 = () => {

    const [userstate, setUserstate] = useState('Main');

    useEffect(()=> {

    }, [userstate])



    return (
        <Layout className="layout">
            <Header>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" value={userstate} onChange={(e) => setUserstate(e.target.value)}>
                  <Menu.Item value="Main"> 낫 로그인</Menu.Item>
                  <Menu.Item value="FirstLogin"> 첫 로그인</Menu.Item>
                  <Menu.Item value="Login"> Login</Menu.Item>
                </Menu>
            </Header>
            <Signin state={userstate}></Signin>

        </Layout>
    );
};

export default Page2;
