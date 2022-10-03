import { useEffect, useState } from "react";
import ReactMultiCarousel from "../common/ReactMultiCarousel";
import RecipeCardComponent from "../recipe/RecipeCardComponent";
import { useSelector } from "react-redux/es/hooks/useSelector";
import apiClient from "../../api/index";
import { setSelectedIngredient } from "../../store/slices/ingredientSlice";
import { setSelectedRecipe } from "../../store/slices/recipeSlice";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import style from "./RecommendedRecipeComponent.module.css";

const RecommendedRecipeComponent = (props) => {

    const ingredientIng = useSelector(state => state.ingredient.selectedIngredient.ingSeq);
    const accessToken = useSelector(state => state.auth.accessToken);
    const dispatch = useDispatch();
    const [recommendedRecipes, setRecommendedRecipes] = useState([]);
    console.log(ingredientIng)

    const recipeClickHandle = (recSeq) => {
        //추천된 레시피 클릭했을 때,
        console.log(recSeq);

        dispatch(setSelectedRecipe(recSeq));

    };

    useEffect(() => {

        apiClient
            .get(`/ingredients/${ingredientIng}/recipes`, {
                headers: {
                    Authorization: accessToken,
                },
                params: { 
                    ingredientIng
                }
            }).then(response => {
                console.log(response);
                setRecommendedRecipes(response.data);
                console.log(ingredientIng)
                

            }).catch(error => {
                console.log(error);
            })
        }, [ingredientIng]);

    return <div className={style.panel}>
        <h2>만들어 보세요!</h2>
        <ReactMultiCarousel>
            {recommendedRecipes.map((recipe) => {
                return <div className={style["container"]}>
                    <RecipeCardComponent key={recipe.recSeq} recipe={recipe} recipeClickHandle={recipeClickHandle} />
                </div>
            })}
        </ReactMultiCarousel>
    </div>
}

export default RecommendedRecipeComponent;