//https://redux-toolkit.js.org/tutorials/quick-start

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
