//https://redux-toolkit.js.org/tutorials/quick-start

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import recipeSlice from "./slices/recipeSlice";
import ingredientSlice from "./slices/ingredientSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    recipe: recipeSlice,
    ingredient: ingredientSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
