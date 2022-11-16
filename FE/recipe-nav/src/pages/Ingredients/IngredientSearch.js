import { Button, Card, Carousel, Input, Pagination, Row, Spin } from "antd";
import Col from "antd/es/grid/col";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import style from "./IngredientSearch.module.css";
import IngredientImg from "../../assets/ingredient_image.png";
import IngredientCardComponent from "../../components/ingredient/IngredientCardComponent";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../api";
import { useNavigate } from "react-router-dom";
import {
  setIngredients,
  setSelectedIngredient,
  setPage,
  setSize,
  setTotalItem,
  setSearchString,
} from "../../store/slices/ingredientSlice";
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

const IngredientSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredient.ingredients);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const searchString = useSelector((state) => state.ingredient.searchString);

  const page = useSelector((state) => state.ingredient.page);
  const size = useSelector((state) => state.ingredient.size);
  const totalItem = useSelector((state) => state.ingredient.totalItem);
  const [isReady, setIsReady] = useState(false);
  const [tempString, setTempString] = useState(searchString);

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
    setIsReady(false);
    console.log(searchString);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (searchString == "" || searchString == null) {
      apiClient
        .get("/ingredients/page", {
          headers: {
            Authorization: accessToken,
          },
          params: {
            page,
            size,
          },
        })
        .then((response) => {
          setIsReady(true);
          console.log("식자재 요청");
          console.log(response);
          console.log(response.data.totalPages);
          dispatch(setIngredients(response.data.content));
          dispatch(setTotalItem(response.data.totalElements));
        })
        .catch((error) => {
          console.log("요청 에러");
          console.log(error);
          setIsReady(true);
        });
    } else {
      console.log(searchString);
      apiClient
        .get("/ingredients/list/name", {
          headers: {
            Authorization: accessToken,
          },
          params: {
            ingName: searchString,
          },
        })
        .then((response) => {
          console.log("레시피 요청");
          console.log(response);
          dispatch(setIngredients(response.data));
          let totalItem = response.data.length;
          let totalPage = parseInt(totalItem / size) + 1;
          dispatch(setPage(1));
          dispatch(setTotalItem(totalItem));
          setIsReady(true);
        })
        .catch((error) => {
          setIsReady(true);
        });
    }
  }, [page, size, searchString]);

  const onSearchHandle = (e) => {
    console.log("식자재 이름 검색");
    dispatch(setSearchString(tempString));
  };

  const onSearchChangeHandle = (e) => {
    //입력 박스에 입력하였을 때, 검색어 업데이트를 위하여
    setTempString(e.target.value);
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
                value={tempString}
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
            {!isReady && (
              <Row>
                <div style={{ height: "100vh" }}>
                  <Spin tip="Loading..."></Spin>
                </div>
              </Row>
            )}

            {isReady &&
              ingredients.length > 0 &&
              ingredients.map((ingredient, i) => {
                return (
                  <IngredientCardComponent
                    key={ingredient.ingSeq}
                    ingredient={ingredient}
                    ingredientClickHandle={ingredientClickHandle}
                  ></IngredientCardComponent>
                );
              })}
            {ingredients.length == 0 && <h1>비어있다.</h1>}
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

export default IngredientSearch;
