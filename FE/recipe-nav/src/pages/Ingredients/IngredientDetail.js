import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./IngredientDetail.module.css";
import { Collapse, Image, Table } from "antd";

import { proxyImageURL } from "../../api";
import { RollbackOutlined } from "@ant-design/icons";
import IngredientGraphComponent from "../../components/ingredient/IngredientGraphComponent";

import IngredientScrapButtonComponent from "../../components/ingredient/IngredientScrapButtonComponent";
import RecommendedRecipeComponent from "../../components/ingredient/RecommendedRecipeComponent";

const comparator = function (a, b) {
  return a.ingDate - b.ingDate;
};

const columns = [
  {
    title: "날짜",
    dataIndex: "ingDate",
    key: "ingDate",
  },
  {
    title: "최대가",
    dataIndex: "ingMaxCost",
    key: "ingMaxCost",
  },
  {
    title: "최저가",
    dataIndex: "ingMinCost",
    key: "ingMinCost",
  },
  {
    title: "평균가",
    dataIndex: "ingAvgCost",
    key: "ingAvgCost",
  },
];

const IngredientDetail = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);

  console.log(params);

  const selectedIngredient = useSelector(
    (state) => state.ingredient.selectedIngredient,
  );

  const backPageClickHandle = () => {
    navigate(-1);
  };

  console.log(selectedIngredient);

  return (
    <>
      {" "}
      <div className={style["back-page"]} onClick={backPageClickHandle}>
        {" "}
        <RollbackOutlined />
      </div>
      <div className={style["ingredient-detail-container"]}>
        <div className={style["recipe-detail-head"]}>
          <h2 className={style["category-text"]}>
            {selectedIngredient.ingName}
          </h2>
          <IngredientScrapButtonComponent
            ingredientIng={selectedIngredient.ingSeq}
            ingredient={selectedIngredient}
          />
        </div>

        <div className={style["ingredient-detail-meta"]}>
          <div className={style["ingredient-detail-head-post"]}>
            <Image
              src={proxyImageURL + selectedIngredient.ingImg}
              fluid="true"
            />
          </div>

          <div className={style["ingredient-detail-desc"]}>
            <div>평균가격</div>
            <div>
              <IngredientGraphComponent />
            </div>
          </div>
        </div>
        <div className={style["footer"]}>
          <RecommendedRecipeComponent />
        </div>
        <div className={style["recipe-detail-phase-container"]}>
          <h2 className={style["phase-text-bar"]}>가격 전체 조회</h2>
          <Collapse>
            <Collapse.Panel>
              {/* //표만들기 시작 */}
              <Table
                columns={columns}
                dataSource={selectedIngredient.ingredientPriceLogList}
              />
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default IngredientDetail;
