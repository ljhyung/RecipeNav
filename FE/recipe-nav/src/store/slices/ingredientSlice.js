import { createSlice } from "@reduxjs/toolkit";

const initialState = {

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
          if (state.ingredients[i].ingSeq == action.payload) {
            state.selectedIngredient = state.ingredients[i];
          }
        }
      },
    },
  });
  export const { setIngredients, setSelectedIngredient } = ingredientSlice.actions;
  export default ingredientSlice.reducer;

