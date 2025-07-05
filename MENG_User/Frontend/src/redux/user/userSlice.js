
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     currentUser: null,
//     token: null,
//     isLoading: false,
//     error: null,
// };

// const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//         loginStart: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         loginSuccess: (state, action) => {
//             state.isLoading = false;
//             state.currentUser = action.payload;
//             state.token = action.payload.token;
//             state.error = null;
//         },
//         loginFailure: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         },
//         logout: (state) => {
//             state.currentUser = null;
//             state.token = null;
//             localStorage.removeItem('token');
//         },
//         updateUser: (state, action) => {
//             state.currentUser = { ...state.currentUser, ...action.payload };
//         }
//     },
// });

// export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = userSlice.actions;

// export default userSlice.reducer;