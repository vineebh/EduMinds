// src/redux/contactSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialStateData = {
  contactData: {
    name: "",
    email: "",
    message: "",
  },
};

const contactSlice = createSlice({
  name: "contact",
  initialState: initialStateData,
  reducers: {
    setContactData: (state, action) => {
     
      state.contactData = { ...state.contactData, ...action.payload };
    },
  },
});

export const { setContactData } = contactSlice.actions;
export default contactSlice.reducer;
