import { configureStore } from "@reduxjs/toolkit";
import contectReducer from './contectSlice'
import authReducer from './authSlice';
import progressReducer from './progressSlice'
import  testReducer from    './testSlice'

const store = configureStore ({
    reducer :{
        contact:contectReducer,
        auth:authReducer,
        progress: progressReducer,
        test:testReducer
    }
})

export default store;