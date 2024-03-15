import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Initial state for forgot password functionality
    forgotPasswordLoading: false,
    forgotPasswordError: null,
    forgotPasswordSuccess: false,
};

export const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState,
    reducers: {
        // Reducer to set loading state during forgot password request
        forgotPasswordRequest: (state) => {
            state.forgotPasswordLoading = true;
            state.forgotPasswordError = null;
            state.forgotPasswordSuccess = false;
        },
        // Reducer to handle successful forgot password request
        forgotPasswordSuccess: (state) => {
            state.forgotPasswordLoading = false;
            state.forgotPasswordSuccess = true;
        },
        // Reducer to handle failed forgot password request
        forgotPasswordFailure: (state, action) => {
            state.forgotPasswordLoading = false;
            state.forgotPasswordError = action.payload;
        },
        // Reset forgot password state
        resetForgotPasswordState: (state) => {
            state.forgotPasswordLoading = false;
            state.forgotPasswordError = null;
            state.forgotPasswordSuccess = false;
        },
    },
});

// Exporting action creators
export const {
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    resetForgotPasswordState,
} = forgotPasswordSlice.actions;

// Exporting the reducer
export default forgotPasswordSlice.reducer;
