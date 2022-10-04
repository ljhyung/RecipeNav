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
const Myingredients = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [myingredients, setMyingredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const MyingredientsHandle = (e) => {
    setMyingredients(e);
    console.log("핸들러 확인용");
  };

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

  useEffect(() => {
    axiosClient
      .get("/my-infos/ingredients", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);

        setLoading(true);
        MyingredientsHandle(response.data);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }, []);

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
              backgroundRepeat: `no-repeat`,
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
            <div className={style.box}>{myIngredientsCard}</div>
          </SimpleBar>
        ) : (
          <Row></Row>
        )}
      </div>
    </div>
  );
};

export default Myingredients;
