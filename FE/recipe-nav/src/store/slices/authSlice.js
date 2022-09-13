import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  user: {
    ninckName: "",
    gender: "",
    age: "",
  },
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = authSlice.actions; //액션이라 카는데 , 저 authSlice의 reducers 밑에 액션들임

export default authSlice.reducer; //스토어 입장에서는 슬라이스가 리듀서 관점이기 때문
