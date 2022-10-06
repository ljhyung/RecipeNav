import style from "./IngredientScrapButtonComponent.module.css";
import apiClient from "../../api/index";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  addMyIgredient,
  deleteOneInMyIgredient,
  setMyIngredients,
} from "../../store/slices/ingredientSlice";
import { StarTwoTone } from "@ant-design/icons";
import { message } from "antd";
const IngredientScrapButtonCopmonent = (props) => {
  const myIngredients = useSelector((state) => state.ingredient.myIngredients);
  const dispatch = useDispatch();

  let [syncControl, setSyncControl] = useState(false);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const ingredientIng = props.ingredientIng; //props.reciperec

  let isAleardy = false;
  for (let i = 0; i < myIngredients.length; i++) {
    if (myIngredients[i].ingSeq === ingredientIng) {
      isAleardy = true;
    }
  }

  const scrapButtonClickHadler = (e) => {
    e.preventDefault();
    console.log(syncControl);
    setSyncControl(true); // 버튼 사용 못하게

    if (isAleardy) {
      //이미 찜한거 였다면
      apiClient
        .delete(`/my-infos/ingredients/${ingredientIng}`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          console.log(response);
          message.info("찜해제 완료");
          dispatch(deleteOneInMyIgredient(ingredientIng));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //찜한게 아니라 이제 찜하는 거라면
      apiClient
        .post(
          `/my-infos/ingredients/${ingredientIng}`,
          {},
          {
            headers: {
              Authorization: accessToken,
            },
          },
        )
        .then((response) => {
          console.log(response);
          message.info("찜하기 완료");
          dispatch(addMyIgredient(props.ingredient));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(syncControl);
    setSyncControl(false);
  };
  return (
    <>
      <button
        className={style["ingredient_scrap_btton"]}
        onClick={scrapButtonClickHadler}
        disabled={syncControl}
      >
        <div className={style["icon-box"]}>
          <StarTwoTone twoToneColor={isAleardy ? "#DCF80D " : "grey"} />
        </div>
      </button>
    </>
  );
};

export default IngredientScrapButtonCopmonent;
