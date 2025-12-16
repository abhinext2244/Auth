import  authReducer  from "./slices/authSlices";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})