import {
    FieldTimeOutlined,
    StarOutlined,
    UsergroupAddOutlined,
  } from "@ant-design/icons";
  import style from "./IngredientExtraDataComponent.module.css";
  const IngredientExtraDataComponent = (props) => {
    const { ingName, ingCategory, ingDescription, ingCalorie   } = props;
    return (
      <div className={style["ingredient-extra-data-component"]}>
        <div>
          <div className={style["icon"]}>
            <UsergroupAddOutlined />
          </div>
          <div className={style["value"]}>{ingName}</div>
        </div>
        <div>
          <div className={style["icon"]}>
            <FieldTimeOutlined width={50} />
          </div>
          <div className={style["value"]}>{ingCategory}</div>
        </div>
        <div>
          <div className={style["icon"]}>
            <StarOutlined />
          </div>
          <div className={style["value"]}>{ingDescription}</div>
        </div>
        <div>
          <div className={style["icon"]}>
            <StarOutlined />
          </div>
          <div className={style["value"]}>{ingCalorie}</div>
        </div>
      </div>
    );
  };
  export default IngredientExtraDataComponent;