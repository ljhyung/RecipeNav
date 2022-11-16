import { timeFormatChange } from "../../api/TimeFormatUtil";
import RecipeGradeComponet from "./RecipeGradeComponet";
import style from "./RecipeReviewComponent.module.css";
const RecipeReviewComponent = (props) => {
  const reviews = props.reviews;
  console.log(reviews);

  let gradeArr = new Array(reviews.recRevGrade);
  return (
    <>
      <div>
        {reviews.map((review) => {
          return (
            <div key={review.recRevSeq} className={style["review-box"]}>
              <div className={style["review-head"]}>
                <div className={style["review-name"]}>
                  {review.userName == null
                    ? "무명"
                    : review.userName}
                </div>
                <div className={style["review-date"]}>
                  {timeFormatChange(review.revModDate)}
                </div>
                <div className={style["review-grade"]}>
                  <RecipeGradeComponet grade={review.recRevGrade} />
                </div>
              </div>
              <div className={style["review-body"]}>
                <div className={style["review-title"]}>
                  {review.recRevTitle}
                </div>
                <div className={style["review-content"]}>
                  {review.recRevContent}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecipeReviewComponent;
