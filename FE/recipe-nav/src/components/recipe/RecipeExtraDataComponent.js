import {
  FieldTimeOutlined,
  StarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import style from "./RecipeExtraDataComponent.module.css";
const RecipeExtraDataComponent = (props) => {
  const { recAmount, cookingTime, recLevel } = props;
  return (
    <div className={style["recipe-extra-data-component"]}>
      <div>
        <div className={style["icon"]}>
          <UsergroupAddOutlined />
        </div>
        <div className={style["value"]}>{recAmount}</div>
      </div>
      <div>
        <div className={style["icon"]}>
          <FieldTimeOutlined width={50} />
        </div>
        <div className={style["value"]}>{cookingTime}</div>
      </div>
      <div>
        <div className={style["icon"]}>
          <StarOutlined />
        </div>
        <div className={style["value"]}>{recLevel}</div>
      </div>
    </div>
  );
};
export default RecipeExtraDataComponent;
