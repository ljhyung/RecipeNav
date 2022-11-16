import style from "./RecipeIngredientListComponent.module.css";
const RecipeIngredientListComponent = (props) => {
  const recipeIngredientList = [...props.recipeIngredientList];
  console.log(recipeIngredientList);
  return (
    <>
      <div className={style["ingredient-container"]}>
        {recipeIngredientList
          .sort((a, b) => {
            let one = a.ingType === "주재료" ? -1 : 0;
            let two = b.ingType === "주재료" ? -1 : 0;
            return one - two;
          })
          .map((ingredient) => {
            return (
              <div
                key={ingredient.recIngSeq}
                className={style["ingredient-box"]}
              >
                <div
                  style={
                    ingredient.ingType === "주재료"
                      ? { fontWeight: "bold" }
                      : {}
                  }
                >
                  {ingredient.ingName}
                </div>
                <div>{ingredient.ingAmount}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RecipeIngredientListComponent;
