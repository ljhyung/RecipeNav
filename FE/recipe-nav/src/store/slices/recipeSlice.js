import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myRecipes: [],
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
    recipeProcessList: [],
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
        if (state.recipes[i].recSeq === action.payload) {
          state.selectedRecipe = state.recipes[i];
        }
      }
    },
    setSelectedRecipeSimlar(state, action) {
      state.selectedRecipe = action.payload;
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
    setMyRecipes(state, action) {
      state.myRecipes = action.payload;
    },
    addMyRecipe(state, action) {
      console.log(action.payload);
      console.log(state.myRecipes);

      let temp = [...state.myRecipes];
      temp.push(action.payload);

      state.myRecipes = temp;
    },
    deleteOneInMyRecipe(state, action) {
      console.log(action.payload);
      for (let i = 0; i < state.myRecipes.length; i++) {
        if (action.payload == state.myRecipes[i]?.recSeq) {
          let temp = [...state.myRecipes];
          temp.splice(i, 1);
          state.myRecipes = temp;
          console.log("삭제");
        }
      }
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
  setMyRecipes,
  setSelectedRecipeSimlar,
  addMyRecipe,
  deleteOneInMyRecipe,
} = recipeSlice.actions;
export default recipeSlice.reducer;
