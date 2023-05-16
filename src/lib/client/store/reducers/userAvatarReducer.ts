import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { USER_AVATAR_ACTION } from "../types";

export type UserAvatarStateType = {
  userAvatar: string;
};

const initialState: UserAvatarStateType = {
  userAvatar: "",
};

const userAvatarSlice = createSlice({
  name: "userAvatar",
  initialState,
  reducers: {
    userAvatarReducer(state, action: PayloadAction<USER_AVATAR_ACTION>) {
      switch (action.payload.type) {
        case "SET_USER_AVATAR": {
          return {
            userAvatar: action.payload.value,
          };
        }
      }
    },
  },
});

export const userAvatarActions = userAvatarSlice.actions;

export default userAvatarSlice.reducer;
