import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
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
    recipeIngredientList: [],
  },
  page: 1,
  size: 50,
  totalItem: 0,
  searchString: "",
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
    setSelectedRecipeReview(state, action) {
      state.selectedRecipe.reviews = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    setTotalItem(state, action) {
      state.totalItem = action.payload;
    },
    setSearchString(state, action) {
      state.searchString = action.payload;
    },
  },
});
export const {
  setRecipes,
  setSelectedRecipe,
  setSelectedRecipeReview,
  setPage,
  setSize,
  setTotalItem,
  setSearchString,
} = recipeSlice.actions;
export default recipeSlice.reducer;
