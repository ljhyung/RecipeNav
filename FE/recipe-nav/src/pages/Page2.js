import Signin from "./Signin/Signin.js";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Layout, Menu } from "antd";
//첫페이지

const Page2 = () => {
  console.log("Page2 로딩");
  const [userstate, setUserstate] = useState("Main");

  const changeState = () => {
    setUserstate("FirstLogin");
  };
  return (
    <Layout className="layout">
      <Button type="primary" onClick={changeState}>
        {" "}
        사랑은 언제나 눈물이 돼
      </Button>
      <Signin USA={userstate}></Signin>
    </Layout>
  );
};

export default Page2;
