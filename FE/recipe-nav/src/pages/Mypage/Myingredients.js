import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../api";
import { Button, Row, Col, Statistic } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import style from "./Myrecipes.module.css";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { setSelectedIngredientDirect } from "../../store/slices/ingredientSlice";
import { StarTwoTone } from "@ant-design/icons";
const Myingredients = () => {
  const navigate = useNavigate();

  const myingredients = useSelector((state) => {
    return state.ingredient.myIngredients;
  });

  console.log("내 식자재", myingredients);

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const recipeClickHandle = (ingSeq) => {
    //레시피 클릭했을 때,
    for (let i = 0; i < myingredients.length; i++) {
      if (myingredients[i].ingSeq === ingSeq) {
        console.log("qwe");
        dispatch(setSelectedIngredientDirect(myingredients[i]));
        break;
      }
    }
    navigate("/ingredient/" + ingSeq);
  };

  const myIngredientsCard = myingredients.map((item, i) => {
    return (
      <div className={style["card-item"]} key={i}>
        <div
          onClick={() => recipeClickHandle(item.ingSeq)}
          className={style["card-item-link"]}
        >
          <div
            className={style["card-item-img"]}
            style={{
              width: 120,
              height: 120,
              background: `url("${item.ingImg}")`,
              backgroundSize: `contain`,
              backgroundRepeat: `no-crepeat`,
              backgroundPosition: `center`,
            }}
          />
          <div className={style["card-item-title"]}>{item.ingName}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="page-wrapper myinfo">
      <div className="page">
        <h2>나의 식자재</h2>
        {loading ? (
          <SimpleBar style={{ maxHeight: 300 }} className={style["page"]}>
            <div className={style.box}>
              {myIngredientsCard.length > 0 && myIngredientsCard}

              {myIngredientsCard.length === 0 && (
                <div
                  style={{
                    gridColumnStart: 1,
                    gridColumnEnd: -1,
                    fontSize: 20,
                  }}
                >
                  <StarTwoTone twoToneColor={"gold "} />
                  <span> 을 눌러 추가할 수 있어요!</span>
                </div>
              )}
            </div>
          </SimpleBar>
        ) : (
          <Row></Row>
        )}
      </div>
    </div>
  );
};

export default Myingredients;
