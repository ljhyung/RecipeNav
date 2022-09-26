import {  Carousel, Input } from "antd";
import Col from "antd/es/grid/col";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import style from "./Recipe.module.css";
import PizzaImg from "../../assets/pizza_img.jpg";
import RecipeCardComponent from "../../components/recipe/RecipeCardComponent";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../api";
import { useNavigate } from "react-router-dom";
import { setRecipes, setSelectedRecipe } from "../../store/slices/recipeSlice";
import { proxyImageURL } from "../../api";
const CustomInput = styled(Input)`
  height: 50px;
  border-radius: 5px 0px 0px 5px;
  border-color: #53a62d;

  :hover,
  :active,
  :focus {
    border-color: #53a62d;
    box-shadow: #53a62d 0px 0px 1px;
  }
`;
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const RecipeSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [searchString, setSearchString] = useState("");
  const [tempString,setTempString] = useState("");
  
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  
  useEffect(()=>{
    console.log(searchString);

    apiClient
      .get("/recipes/all", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          page,
          size,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(setRecipes(response.data.content));
      })
      .catch((error) => {
        console.log("요청 에러");
        console.log(error);
      });
  },[page,size,searchString])

  const onSearchHandle = (e) => {
    setSearchString(tempString);
  };

  const onSearchChangeHadle = (e) => {
    //입력 박스에 입력하였을 때, 검색어 업데이트를 위하여
    setTempString(e.target.value);
  };

  const recipeClickHandle = (recSeq) => {
    //레시피 클릭했을 때,
    console.log(recSeq);

    dispatch(setSelectedRecipe(recSeq));

    navigate("/recipe/" + recSeq);
  };
  return (
    <>
      <div className={style["search-container"]}>
        <Col md={24}>
          <div className={style["input-container"]}>
            <Carousel>
              <img
                style={contentStyle}
                src={PizzaImg}
                className={style["carousel_img"]}
                alt="음식사진"
              />
            </Carousel>
            <div className={style["input-frame"]}>
              <CustomInput
                placeholder="레시피 이름"
                onChange={onSearchChangeHadle}
                onKeyDown={KeyboardEvent.enter}
              />
              <button
                className={style["search-button"]}
                onClick={onSearchHandle}
              >
                <h3>검 색</h3>
              </button>
            </div>
          </div>

          <div className={style["recipe-container"]}>
            {recipes.length > 0 && recipes.map((recipe, i) => {
              return (
                <RecipeCardComponent
                  key={recipe.recSeq}
                  recipe={recipe}
                  recipeClickHandle={recipeClickHandle}
                ></RecipeCardComponent>
              );
            })}
            {
              recipes.length == 0 &&
              <h1>비어있다.</h1>
            }
          </div>
        </Col>
      </div>{" "}
    </>
  );
};

export default RecipeSearch;
