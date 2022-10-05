import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient, { proxyImageURL } from "../../api";
import { Button, Row, Col, Statistic, Spin } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import style from "./Myrecipes.module.css";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { setSelectedRecipeSimlar } from "../../store/slices/recipeSlice";
import { StarTwoTone } from "@ant-design/icons";

const Myrecipes = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [myingredients, setMyingredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const MyingredientsHandle = (e) => {
    setMyingredients(e);
    setLoading(true);
    console.log("핸들러 확인용");
  };

  const recipeClickHandle = (recSeq) => {
    //레시피 클릭했을 때,

    console.log(recSeq);
    for (let i = 0; i < myingredients.length; i++) {
      if (myingredients[i].recSeq == recSeq) {
        dispatch(setSelectedRecipeSimlar(myingredients[i]));
        break;
      }
    }
    navigate("/recipe/" + recSeq);
  };

  useEffect(() => {
    axiosClient
      .get("/my-infos/recipes", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        MyingredientsHandle(response.data);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }, []);

  const MyrecipesCard = myingredients.map((item, i) => {
    console.log(item);
    let imageUrl = item.recImg;
    if (!imageUrl.startsWith("https")) {
      imageUrl = proxyImageURL + imageUrl;
    }
    return (
      <div className={style["card-item"]} key={i}>
        <div
          onClick={() => recipeClickHandle(item.recSeq)}
          className={style["card-item-link"]}
        >
          <div
            className={style["card-item-img"]}
            style={{
              width: 120,
              height: 120,
              background: `url("${imageUrl}")`,
              backgroundSize: `contain`,
              backgroundRepeat: `no-repeat`,
              backgroundPosition: `center`,
            }}
          />
          <div className={style["card-item-title"]}>{item.recName}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="page-wrapper myinfo">
      <div className="page">
        <h2>나의 레시피</h2>
        {loading ? (


          <SimpleBar style={{ maxHeight: 300 }} className={style["page"]}>
            <div className={style.box}>

              {myingredients.length > 0 && MyrecipesCard}
              {myingredients.length === 0 &&
                <div style={{ gridColumnStart: 1, gridColumnEnd: -1, fontSize: 20 }}>
                  <StarTwoTone twoToneColor={"gold "} />
                  <span>  을 눌러 추가할 수 있어요!</span>
                </div>}
            </div>




          </SimpleBar>



        ) : (
          <Row>
            <Spin tip="Loading..."></Spin>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Myrecipes;
