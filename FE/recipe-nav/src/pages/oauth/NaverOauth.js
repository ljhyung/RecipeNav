import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../api";

const NaverOauth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.search);

  const code = location.search.split("&")[0].split("=")[1];
  const state = location.search.split("=")[2];

  console.log(code);
  console.log(state);
  useEffect(() => {
    axiosClient
      .post(`/oauth/authentication/naver`, {
        code,
        state,
      })
      .then((response) => {
        console.log("응답값");
        console.log(response);

        axiosClient
          .get("/my-infos")
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
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
