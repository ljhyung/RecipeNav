import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../api";
import {
  setAthenticated,
  setToken,
  setUser,
} from "../../store/slices/authSlice";
import { setMyRecipes } from "../../store/slices/recipeSlice";
import { useDispatch } from "react-redux";
import { setMyIngredients } from "../../store/slices/ingredientSlice";

const NaverOauth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const code = location.search.split("=")[1].split("&")[0];
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

        if (response.data === "") {
          console.log("로그인 요청 후 받은 값이 없습니다.");
          navigate("/login");
          return;
        }
        let Authorization = response.data.data.accessToken;
        let isSuccess = response.data.isSuccess;

        if (Authorization === "" || isSuccess !== 1) {
          console.log("로그인 실패");
          return;
          //받아온 토큰값이 없으면 중단
        }

        dispatch(setAthenticated(true));
        dispatch(setToken({ accessToken: Authorization }));

        axiosClient
          .get("/my-infos", {
            headers: {
              Authorization,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data === null || res.data === "") {
              console.log("받아온 사용자 정보의 데이터가 없습니다.");
              navigate("/login");
              return;
            }
            dispatch(
              setUser({
                nickName: res.data.userName,
                gender: res.data.userGender,
                age: res.data.userAge,
              }),
            );
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });

        axiosClient
          .get("/my-infos/recipes", {
            headers: {
              Authorization,
            },
          })
          .then((response) => {
            console.log(response);
            let myRecipes = response.data;
            dispatch(setMyRecipes(myRecipes));
          })
          .catch((erorr) => {
            console.log("나의 선호 레시피를 불러오던 중 에러");
          });

        axiosClient
          .get("/my-infos/ingredients", {
            headers: {
              Authorization,
            },
          })
          .then((response) => {
            console.log(response.data);

            dispatch(setMyIngredients(response.data));
          })
          .catch((error) => {
            console.log("에러");
            console.log(error);
          });
      })
      .catch((error) => {
        navigate("/");
        console.log(error);
      });
  });

  return (
    <>
      <h1>로그인 중</h1>
    </>
  );
};

export default NaverOauth;
