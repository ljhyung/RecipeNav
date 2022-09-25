import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import style from "./RecipeReviewInput.module.css";

const RecipeReviewInput = (props) => {
  const [reviewText, setReviewText] = useState("");
  const onChageHandle = (e) => {
    setReviewText(e.target.value);
  };
  const onClickHandle = (e) => {
    props.onClickHandle(reviewText);
    setReviewText("");
  };
  return (
    <>
      <div className={style["revice-input"]}>
        <textarea
          className={style["text-input"]}
          value={reviewText}
          onChange={onChageHandle}
        />
        <button onClick={onClickHandle}>
          <SendOutlined />
        </button>
      </div>
    </>
  );
};

export default RecipeReviewInput;
