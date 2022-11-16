import React, { useEffect, useState } from "react";
import style from "./BudgetSearch.module.css";
import PriceBaseHistogram from "../../components/budget/PriceBaseHistogram";
import PriceSearchInput from "../../components/budget/PriceSearchInput";
import ReciepeBoxComponent from "../../components/budget/ReciepeBoxComponent";
import apiClient from "../../api/";
import { useDispatch, useSelector } from "react-redux";
import EmptySearchPage from "../../components/common/EmptySearchPage";
import { setRecipes } from "../../store/slices/recipeSlice";
import { RobotOutlined } from "@ant-design/icons";
const numberRex = /^[0-9]+$/;

const BudgetSearch = (props) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes);

  console.log(recipes);
  const changeMinPrice = (e) => {
    let value = e.target.value;

    if (!numberRex.test(value) && value != "") {
      return;
    }

    console.log(value);
    setMinPrice(e.target.value);
  };

  const changeMaxPrice = (e) => {
    let value = e.target.value;

    if (!numberRex.test(value) && value != "") {
      return;
    }

    console.log(value);
    setMaxPrice(e.target.value);
  };

  const scrollChangeHandle = ([min, max]) => {
    console.log(min + ":" + max);
    setMinPrice(min);
    setMaxPrice(max);
  };
  const searchClickHadler = (e) => {
    e.preventDefault();
    console.log("조회 버튼이 클릭되었습니다.", minPrice, maxPrice);
    return apiClient
      .get("/recipes/recommendation", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          minPrice: minPrice - 0,
          maxPrice: maxPrice - 0,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(setRecipes(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={style["graph-contaner"]}>
        <PriceBaseHistogram recipes={recipes} />
      </div>
      <div className={style["budget-input-panel"]}>
        <PriceSearchInput
          minPrice={minPrice}
          maxPrice={maxPrice}
          searchClickHadler={searchClickHadler}
          scrollChangeHandle={scrollChangeHandle}
          changeMinPrice={changeMinPrice}
          changeMaxPrice={changeMaxPrice}
        />
      </div>
      <div className={style["result-print-panel"]}>
        {recipes.length !== 0 &&
          recipes.map((recipe, i) => {
            return (
              <ReciepeBoxComponent
                key={recipe.recSeq}
                recipe={recipe}
              ></ReciepeBoxComponent>
            );
          })}
      </div>
      {recipes.length === 0 && (
        <h1 style={{ textAlign: "center" }}>
          <RobotOutlined />
          검색 결과가 존재하지 않습니다.
        </h1>
      )}
    </>
  );
};

export default BudgetSearch;
