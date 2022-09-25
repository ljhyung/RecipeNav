import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: true,
  user: {
    nickName: "",
    gender: "",
    age: "",
  },
  accessToken:
    "eyJraWQiOiJrZXkzIiwidHlwZSI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJyZWNpcGVuYXYiLCJhdWQiOiJST0xFX1VTRVIiLCJpYXQiOjE2NjM4MjEzNTMsInN1YiI6InVzZXIiLCJpc05ld1VzZXIiOjAsInVzZXJJZCI6IlVMYmw2bjNFSGc2c2FCNXUwY2I0ODJmUGc2VS1wN0dGSVoxdERtUTZqU00iLCJ1c2VyU2VxIjoyfQ.1jeJEqkfmiaWLd29wHAzWJ7hPPd1FtZ9DTNzek2Qfc0",
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
      state.user.nickName = action.payload.nickName;
      state.user.gender = action.payload.gender;
      state.user.age = action.payload.age;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAthenticated, setUser, setToken } = authSlice.actions; //액션이라 카는데 , 저 authSlice의 reducers 밑에 액션들임

export default authSlice.reducer; //스토어 입장에서는 슬라이스가 리듀서 관점이기 때문
