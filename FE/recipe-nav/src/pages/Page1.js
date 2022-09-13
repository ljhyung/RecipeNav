//첫페이지
import { nanoid } from "@reduxjs/toolkit";
import axiosClient from "../api";

const Page1 = () => {
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
    <>
      <h1>첫 페이지</h1>

      <a href={requestUrl}>네이버 로그인</a>
    </>
  );
};

export default Page1;
