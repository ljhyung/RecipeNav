import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authenticated: false,
  user: {
    nickName: "",
    gender: "",
    age: "",
  },
  accessToken:
    "",
  refreshToken: "",
  myIngredients: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user.nickName = action.payload.nickName;
      state.user.gender = action.payload.gender;
      state.user.age = action.payload.age;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    // 관심식자재 전체 조회
    setMyIngredients: (state, action) => {
      state.myIngredients = action.payload.myIngredients;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAthenticated, setUser, setToken } = authSlice.actions; //액션이라 카는데 , 저 authSlice의 reducers 밑에 액션들임

export default authSlice.reducer; //스토어 입장에서는 슬라이스가 리듀서 관점이기 때문
