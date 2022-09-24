import { Button, Card, Carousel, Input } from "antd";
import Col from "antd/es/grid/col";
import Search from "antd/lib/input/Search";
import React, { useState } from "react";
import styled from "styled-components";
import style from "./Recipe.module.css";
import PizzaImg from "../../assets/pizza_img.jpg";
import RecipeCardComponent from "../../components/recipe/RecipeCardComponent";
import { useSelector } from "react-redux";
import apiClient from "../../api";

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
  const recipes = useSelector((state) => state.recipe.recipes);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const onSearchHandle = (e) => {
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
      })
      .catch((error) => {
        console.log("요청 에러");
        console.log(error);
      });
  };

  const onSearchChangeHadle = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <>
      <h3>헤더는 추가되면레시피는 이름으로 찾는다.</h3>
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
            <button className={style["search-button"]} onClick={onSearchHandle}>
              <h3>검 색</h3>
            </button>
          </div>
        </div>

        <div className={style["recipe-container"]}>
          {recipes.map((recipe) => {
            return <RecipeCardComponent recipe={recipe}></RecipeCardComponent>;
          })}
        </div>
      </Col>
    </>
  );
};

export default RecipeSearch;
