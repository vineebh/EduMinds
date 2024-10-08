import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("idToken");
const userID = localStorage.getItem("userID")

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    // Set based on token existence
    idToken: initialToken,
    loginStatus: !!initialToken,
    userInfo: {userID}
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
    setUserInfo(state,action){
      state.userInfo = action.payload 
    }
  },
});

export const { setIsLogin, setLoginStatus, setIdToken, setUserInfo} = authSlice.actions;

export default authSlice.reducer;
