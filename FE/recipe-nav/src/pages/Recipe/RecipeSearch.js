import { Carousel, Input, Pagination, Row, Spin } from "antd";
import Col from "antd/es/grid/col";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import style from "./Recipe.module.css";
import PizzaImg from "../../assets/pizza_img.jpg";
import RecipeCardComponent from "../../components/recipe/RecipeCardComponent";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../api";
import { useNavigate } from "react-router-dom";
import {
  setRecipes,
  setSelectedRecipe,
  setPage,
  setSize,
  setTotalItem,
  setSearchString,
} from "../../store/slices/recipeSlice";
import EmptySearchPage from "../../components/common/EmptySearchPage";

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
  const searchString = useSelector((state) => state.recipe.searchString);

  const page = useSelector((state) => state.recipe.page);
  const size = useSelector((state) => state.recipe.size);
  const totalItem = useSelector((state) => state.recipe.totalItem);

  const [isReady, setIsReady] = useState(false);
  const [tempString, setTempString] = useState("");

  const pageChageHadle = (chagePage, chagePageSize) => {
    console.log("페이지 체인지");
    console.log(chagePage, chagePageSize);
    dispatch(setPage(chagePage));
  };

  const onShowSizeChange = (current, pageSize) => {
    console.log("페이지 사이즈 체인지");
    console.log(current, pageSize);
    dispatch(setSize(pageSize));
  };

  useEffect(() => {
    console.log(searchString);
    setIsReady(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (searchString == "" || searchString == null) {
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
          console.log("레시피 요청");
          console.log(response);
          console.log(response.data.totalPages);
          dispatch(setRecipes(response.data.content));
          dispatch(setTotalItem(response.data.totalElements));
          setIsReady(true);
        })
        .catch((error) => {
          console.log("요청 에러");
          console.log(error);
        });
    } else {
      console.log(searchString);
      apiClient
        .get("/recipes", {
          headers: {
            Authorization: accessToken,
          },
          params: {
            recipeName: searchString,
          },
        })
        .then((response) => {
          setIsReady(true);
          console.log("레시피 요청");
          console.log(response);
          dispatch(setRecipes(response.data));
          let totalItem = response.data.length;
          let totalPage = parseInt(totalItem / size) + 1;
          dispatch(setPage(1));
          dispatch(setTotalItem(totalItem));
        })
        .catch((error) => {});
    }
  }, [page, size, searchString]);

  const onSearchHandle = (e) => {
    console.log("레시피 이름 검색");
    dispatch(setSearchString(tempString));
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
            {!isReady && (
              <Row justify="center">
                <div style={{ height: "100vh" }}>
                  <Spin tip="Loading..."></Spin>
                </div>
              </Row>
            )}

            {isReady &&
              recipes.length > 0 &&
              recipes.map((recipe, i) => {
                return (
                  <RecipeCardComponent
                    key={recipe.recSeq}
                    recipe={recipe}
                    recipeClickHandle={recipeClickHandle}
                  ></RecipeCardComponent>
                );
              })}

            {isReady && recipes.length == 0 && (
              <EmptySearchPage></EmptySearchPage>
            )}
          </div>
          <div className={style["page-container"]}>
            <Pagination
              total={totalItem}
              showSizeChanger
              showQuickJumper
              current={page}
              defaultPageSize={50}
              onChange={pageChageHadle}
              onShowSizeChange={onShowSizeChange}
            />
          </div>
        </Col>
      </div>
    </>
  );
};

export default RecipeSearch;
