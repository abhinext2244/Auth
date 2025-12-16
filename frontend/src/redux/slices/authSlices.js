import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated: false,
    accessToken: null,
    loading: false,
    signupData: null
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
      
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated =Boolean(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.signupData = null
        }
    }
})

export const { setSignupData,  setAccessToken,logout, setLoading } = authSlice.actions
export default authSlice.reducer