import { configureStore } from "@reduxjs/toolkit";
import contectReducer from './contectSlice'
import authReducer from './authSlice';

const store = configureStore ({
    reducer :{
        contact:contectReducer,
        auth:authReducer
    }
})

export default store;