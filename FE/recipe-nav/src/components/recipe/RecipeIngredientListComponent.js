import style from "./RecipeIngredientListComponent.module.css";
const RecipeIngredientListComponent = (props) => {
  const recipeIngredientList = props.recipeIngredientList;
  return (
    <>
      <div className={style["ingredient-container"]}>
        {recipeIngredientList.map((ingredient) => {
          return (
            <div key={ingredient.recIngSeq} className={style["ingredient-box"]}>
              <div
                style={
                  ingredient.ingType === "주재료" ? { fontWeight: "bold" } : {}
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
