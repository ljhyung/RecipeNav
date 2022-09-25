import style from "./RecipeReviewComponent.module.css";
const RecipeReviewComponent = (props) => {
  const reviews = props.reviews;
  console.log(reviews);
  return (
    <>
      <div>
        {reviews.map((review) => {
          return (
            <div key={review.recRevSeq} className={style["review-box"]}>
              <div className={style["review-head"]}>
                <div className={style["review-name"]}>
                  {review.recRevRegUser == null
                    ? "무명"
                    : "review.recRevRegUser"}
                </div>
                <div className={style["review-date"]}>{review.revModDate}</div>
                <div className={style["review-grade"]}>
                  {review.recRevGrade}
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
