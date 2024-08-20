import { createSlice } from "@reduxjs/toolkit";

export type authStateType = {
  isLogIn: boolean;
  token: string;
};

const initialState: authStateType = {
  isLogIn: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isLogIn = action.payload.isLogIn;
      state.token = action.payload.token;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
