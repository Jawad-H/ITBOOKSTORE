import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        registerUser: false,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.registerUser = false;
            state.error = false;

        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.registerUser = false;
            state.error = false;


        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.registerUser = false;

        },
        logoutUser: (state) => {
            localStorage.removeItem("persist:root");
            state.currentUser = null;
            state.registerUser = false;

        },
        registerStart: (state) => {
            state.isFetching = true;
        },
        registerSuccess: (state) => {
            state.isFetching = false;
            state.registerUser = true;
        },
        registerFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        incorrectCredentialToast: (state) => {
            toast.error("Incorrect Credentials");

        },
        registerToast: (state) => {
            toast.error("Something went wrong");

        }

    },
});

export const { loginStart, loginSuccess, incorrectCredentialToast, registerToast, loginFailure, logoutUser, registerStart, registerSuccess, registerFailure } = userSlice.actions;
export default userSlice.reducer;
