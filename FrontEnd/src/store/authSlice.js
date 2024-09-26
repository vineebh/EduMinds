import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("idToken");

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    islogin: !!initialToken, // Set based on token existence
    idToken: initialToken,
    loginStatus: !!initialToken 
  },
  reducers: {
    setIdToken(state, action) {
      state.idToken = action.payload;
      state.loginStatus = !!action.payload; // Update login status based on token
    },
    setIsLogin(state, action) {
      state.islogin = action.payload; // Set directly based on the action payload
    },
    setLoginStatus(state) {
      state.loginStatus = !!state.idToken;
    },
  },
});

export const { setIsLogin, setLoginStatus, setIdToken } = authSlice.actions;

export default authSlice.reducer;
