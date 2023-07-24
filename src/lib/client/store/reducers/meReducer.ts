import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type meStateType = {
  id: string;

  userName: string;
  profilePhoto: string;
};

const initialState: meStateType = {
  id: null,
  userName: null,
  profilePhoto: null,
};

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    setMe: (state, action) => {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.profilePhoto = action.payload.profilePhoto;
    },
  },
});

export const meActions = meSlice.actions;

export default meSlice.reducer;
