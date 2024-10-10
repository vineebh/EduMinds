import { configureStore } from "@reduxjs/toolkit";
import contectReducer from './contectSlice'
import authReducer from './authSlice';
import progressReducer from './progressSlice'

const store = configureStore ({
    reducer :{
        contact:contectReducer,
        auth:authReducer,
        progress: progressReducer
    }
})

export default store;