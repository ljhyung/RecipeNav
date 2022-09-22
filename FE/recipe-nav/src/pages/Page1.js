import "antd/dist/antd.css";
import Home from "./Home";
import { nanoid } from "nanoid";

const Page1 = () => {
  console.log("Page1 로딩");

  const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
  const authUrl = process.env.REACT_APP_NAVER_AUTH_URL;
  const redirectUrl = process.env.REACT_APP_NAVER_REDIRECT_URL;

  const state = nanoid();

  let requestUrl = authUrl;
  requestUrl += "?response_type=code";
  requestUrl += `&client_id=${clientId}`;
  requestUrl += `&state=${state}`;
  requestUrl += `&redirect_uri=${redirectUrl}`;

  return (
    [
      <Home />,
      <a href={requestUrl}>네이버 로그인</a>,
      <div style={{width: 4000}}></div>,
    ]

  );
};

export default Page1;
