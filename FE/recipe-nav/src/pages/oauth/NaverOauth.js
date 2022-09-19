import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../api";

const NaverOauth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.search.split("=")[1];
  const state = location.search.split("=")[2];

  console.log(code);
  console.log(state);
  useEffect(() => {
    axiosClient
      .get(`/oauth/authentication/naver?code=${code}&state=${state}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [code, state]);

  return (
    <>
      <h1>ㅎㅎㅎ</h1>
    </>
  );
};

export default NaverOauth;
