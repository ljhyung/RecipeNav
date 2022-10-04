import React from "react";
import style from "./IngredientCardComponent.module.css";
import {Image} from "antd";
import {proxyImageURL} from "../../api";
import Graph from "./Graph";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
const IngredientCardComponent = (props) => {
    const ingredient = props.ingredient;
    let imageUrl = ingredient.ingImg;
    let logList = ingredient
        .ingredientPriceLogList
        .slice(-10);
    if (imageUrl.startsWith("https")) {} else {
        imageUrl = proxyImageURL + imageUrl;
    }
    console.log(ingredient)
    return (
        <> < div className = {
            style["card-frame"]
        } > <div className={style.head}>
            <Image
                src={imageUrl}
                style={{
                    borderRadius: "5px"
                }}
                height={200}/>
            <div className={style.graph}>
                <Graph data={logList}/>
            </div>
        </div>
        <div className={style.body}>
            <div
                className={style["ingredient-card-title"]}
                onClick={() => props.ingredientClickHandle(ingredient.ingSeq)}>
                {ingredient.ingName}
            </div>
            <div className={style["line"]}/>

            <div className={style.boxbox}>

                {
                    ingredient.ingPriceRate != null
                        ? ingredient.ingPriceRate >= 0
                            ? <div style={{color: 'red'}}><CaretUpOutlined/>{(ingredient.ingPriceRate).toFixed(2)}
                                    %
                                </div>
                            : <div style={{color: 'blue'}}><CaretDownOutlined/>{(ingredient.ingPriceRate).toFixed(2)}
                                    %
                                </div>
                        : <div>-%</div>
                }
                <div>최저가: {ingredient.ingredientPrice.ingMinCost}원</div>
                <div>평균가: {ingredient.ingredientPrice.ingAvgCost}원</div>
                <div>최대가: {ingredient.ingredientPrice.ingMaxCost}원</div>
            </div>
        </div>
        <div className={style.foot}></div>
    </div>
</>
    );
};

export default IngredientCardComponent;
