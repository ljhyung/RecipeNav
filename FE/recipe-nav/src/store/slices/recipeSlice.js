import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [
  ],
  selectedRecipe: {
    recSeq: "",
    recName: "",
    recStep: null,
    recCost: null,
    recCode: "",
    recSummary: "",
    cateCode: "",
    cateFrac: "",
    foodCode: "",
    foodFrac: "",
    cookingTime: "",
    recCalorie: "",
    recAmount: "",
    recLevel: "",
    recIngFrac: "",
    recPrice: 0,
    recImg: "",
    reviews: [],
    recipeIngredientList: [
     
    ],
  },
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes(state, action) {
      console.log(action.payload);
      state.recipes = action.payload;
    },
    setSelectedRecipe(state, action) {
      for (let i = 0; i < state.recipes.length; i++) {
        if (state.recipes[i].recSeq == action.payload) {
          state.selectedRecipe = state.recipes[i];
        }
      }
    },
  },
});
export const { setRecipes, setSelectedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
