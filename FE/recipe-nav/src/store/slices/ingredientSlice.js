import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myIngredients: [
    {
      ingSeq: "",
      ingName: "",
      ingDescription: "",
      ingExDate: "",
      ingCalorie: "",
      ingSeason: "",
      ingCategory: "",
      ingImg: "",
      userIngredients: [],
    },
  ],
  ingredients: [],
  selectedIngredient: {
    ingSeq: "",
    ingName: "",
    ingDescription: "",
    ingExDate: "",
    ingCalorie: "",
    ingSeason: "",
    ingCategory: "",
    ingImg: "",
    userIngredients: [],
  },
  page: 1,
  size: 10,
  totalItem: 0,
  searchString: "",
};

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    setIngredients(state, action) {
      console.log(action.payload);
      state.ingredients = action.payload;
    },
    setSelectedIngredient(state, action) {
      for (let i = 0; i < state.ingredients.length; i++) {
        if (state.ingredients[i].ingSeq === action.payload) {
          state.selectedIngredient = state.ingredients[i];
        }
      }
    },
    setSelectedIngredientDirect(state, action) {
      state.selectedIngredient = action.payload;
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
    setMyIngredients(state, action) {
      state.myIngredients = action.payload;
    },
    setRecommendedRecipes(state, action) {
      state.recommendedRecipes = action.payload;
    },
    addMyIgredient(state, action) {
      let temp = [...state.myIngredients];
      temp.push(action.payload);
      state.myIngredients = temp;
    },
    deleteOneInMyIgredient(state, action) {
      console.log(action.payload);
      for (let i = 0; i < state.myIngredients.length; i++) {
        if (action.payload == state.myIngredients[i]?.ingSeq) {
          let temp = [...state.myIngredients];
          temp.splice(i, 1);
          state.myIngredients = temp;
          console.log("삭제");
        }
      }
    },
  },
});
export const {
  addMyIgredient,
  deleteOneInMyIgredient,
  setIngredients,
  setSelectedIngredient,
  setPage,
  setSize,
  setTotalItem,
  setSearchString,
  setMyIngredients,
  setRecommendedRecipes,
  setSelectedIngredientDirect,
} = ingredientSlice.actions;
export default ingredientSlice.reducer;
