import { SendOutlined } from "@ant-design/icons";
import { Alert, Input, message, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { useState } from "react";
import RecipeGradeComponet from "./RecipeGradeComponet";
import style from "./RecipeReviewInput.module.css";

const RecipeReviewInput = (props) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewGrade, setReviewGrade] = useState(3);
  const [isValid,setIsValid] = useState(true);
  const onChageHandle = (e) => {
    setReviewText(e.target.value);
  };
  const titleChangeHadle = (e) => {
    setReviewTitle(e.target.value);
    setIsValid(true)
  };
  const onChageGrade = (e) => {
    setReviewGrade(e);
  };
  const onClickHandle = (e) => {

    if(reviewTitle== null || reviewTitle===""){
      setIsValid(false);
      return;
    }


    props.onClickHandle({ reviewTitle, reviewText, reviewGrade });
    setReviewText("");
    setReviewTitle("");
    setReviewGrade(3);
  };

  return (
    <>
      <div className={style["revice-input"]}>
        <div>
          <div>
            <input
              type="text"
              className={style["text-title"]}
              value={reviewTitle}
              onChange={titleChangeHadle}
            ></input>
            <Select
              value={reviewGrade}
              className={style["grade-select"]}
              onChange={onChageGrade}
            >
              <Select.Option value={1}>
                <RecipeGradeComponet grade={1} />
              </Select.Option>
              <Select.Option value={2}>
                <RecipeGradeComponet grade={2} />
              </Select.Option>
              <Select.Option value={3}>
                <RecipeGradeComponet grade={3} />
              </Select.Option>
              <Select.Option value={4}>
                <RecipeGradeComponet grade={4} />
              </Select.Option>
              <Select.Option value={5}>
                <RecipeGradeComponet grade={5} />
              </Select.Option>
            </Select>
          </div>
          <div>
            <textarea
              className={style["text-input"]}
              value={reviewText}
              onChange={onChageHandle}
            />
          </div>
        </div>
        <button onClick={onClickHandle} className={style["button-input"]}>
          <div className={style["icon"]}>
            <SendOutlined />
          </div>
        </button>
       
      </div>
    {
      !isValid
      &&
      <Alert message="타이틀은 반드시 입력하여야 합니다." type="error" style={{fontWeight:"bold"}}  showIcon="true"/>
    }   
    </>
  );
};

export default RecipeReviewInput;
