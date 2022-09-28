import { Button, Card, Carousel, Input } from "antd";
import Col from "antd/es/grid/col";
import Search from "antd/lib/input/Search";
import React, { useState } from "react";
import styled from "styled-components";
import style from "./IngredientSearch.module.css";
import IngredientImg from "../../assets/ingredient_image.png";
import IngredientCardComponent from "../../components/ingredients/IngredientCardComponent";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../api";
import { useNavigate } from "react-router-dom";
import { setIngredients, setSelectedIngredient } from "../../store/slices/ingredientSlice";
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

const IngredientSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredient.ingredients);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const onSearchHandle = (e) => {
    console.log(searchString);

    apiClient
      .get("/ingredients", {
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
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        console.log("요청 에러");
        console.log(error);
      });
  };

  const onSearchChangeHandle = (e) => {
    //입력 박스에 입력하였을 때, 검색어 업데이트를 위하여
    setSearchString(e.target.value);
  };

  const ingredientClickHandle = (ingSeq) => {
    //식자재 클릭했을 때,
    console.log(ingSeq);

    dispatch(setSelectedIngredient(ingSeq));

    navigate("/ingredient/" + ingSeq);
  };
  return (
    <>
      <div className={style["search-container"]}>
        <Col md={24}>
          <div className={style["input-container"]}>
            <Carousel>
              <img
                style={contentStyle}
                src={IngredientImg}
                className={style["carousel_img"]}
                alt="식자재 사진"
              />
            </Carousel>
            <div className={style["input-frame"]}>
              <CustomInput
                placeholder="식자재 이름"
                onChange={onSearchChangeHandle}
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

          <div className={style["ingredient-container"]}>
            {ingredients.map((ingredient, i) => {
              return (
                <IngredientCardComponent
                  key={ingredient.ingSeq}
                  ingredient={ingredient}
                  ingredientClickHandle={ingredientClickHandle}
                ></IngredientCardComponent>
              );
            })}
          </div>
        </Col>
      </div>{" "}
    </>
  );
};

export default IngredientSearch;