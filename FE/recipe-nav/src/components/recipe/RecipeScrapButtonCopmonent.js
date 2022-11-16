import style from "./RecipeScrapButtonCopmonent.module.css";
import apiClient from "../../api/index";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  addMyRecipe,
  deleteOneInMyRecipe,
} from "../../store/slices/recipeSlice";
import { StarTwoTone } from "@ant-design/icons";
import { message } from "antd";
const RecipeScrapButtonCopmonent = (props) => {
  const myRecipes = useSelector((state) => state.recipe.myRecipes);
  const dispatch = useDispatch();

  let [syncControl, setSyncControl] = useState(false);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const recipeRec = props.recipeRec; //props.reciperec

  let isAleardy = false;
  for (let i = 0; i < myRecipes.length; i++) {
    if (myRecipes[i].recSeq === recipeRec) {
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
        .delete(`/my-infos/recipes/${recipeRec}`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          console.log(response);
          message.info("찜해제 완료");
          dispatch(deleteOneInMyRecipe(recipeRec));
          setSyncControl(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //찜한게 아니라 이제 찜하는 거라면
      apiClient
        .post(
          `/my-infos/recipes/${recipeRec}`,
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
          dispatch(addMyRecipe(props.recipe));
          setSyncControl(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <button
        className={style["recipe_scrap_btton"]}
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

export default RecipeScrapButtonCopmonent;
