import { createSlice } from "@reduxjs/toolkit";

const   testSlice   =   createSlice({
    name:'test',
    initialState:{questions:[]},
    reducers:{
        setQuestions(state,action){
            state.questions=action.payload
        }
    }
})
export const {setQuestions}=testSlice.actions
export   default    testSlice.reducer