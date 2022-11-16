import { CaretRightOutlined, DollarCircleOutlined } from "@ant-design/icons";
import style from "./RecipeMetaDataExposeComponent.module.css"
import {numberChage} from "../../api/numberFormatUtil"
const RecipeMetaDataExposeComponent =(props)=>{

    const selectedRecipe = props.selectedRecipe;

    const recSummary = selectedRecipe.recSummary;
    const cateFrac = selectedRecipe.cateFrac;
    const foodFrac =selectedRecipe.foodFrac;
    const recIngFrac =selectedRecipe.recIngFrac.trim() ? selectedRecipe.recIngFrac : "미표기";
   const recCalorie = /^0|k|c/i.test(selectedRecipe.recCalorie) ? "-" : selectedRecipe.recCalorie;
    const recPrice = selectedRecipe.recPrice;
    
    return <>
    <p className={style.summary}>소개: {recSummary}</p>
    <span className={style.category1}>분류 : {cateFrac} <CaretRightOutlined /> </span>
    <span className={style.category2}>{foodFrac}  <CaretRightOutlined /></span>
    <span className={style.category3}>{recIngFrac}  </span>
    <p className={style.calorie}>칼로리 : {recCalorie}</p>
    <div className={style.price}>
         <span className={style["price-icon"]}>
         <DollarCircleOutlined style={{color:"gold"}} />
         </span> {numberChage(recPrice)} <span>원</span>
    </div>
</>
}

export default RecipeMetaDataExposeComponent;