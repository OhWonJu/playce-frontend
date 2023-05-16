import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { MODAL_ACTION, PLAYER_ACTION } from "@lib/client/store/types";

export type PlayerStateType = {
  displayPlayer: boolean;
};

const initialState: PlayerStateType = {
  displayPlayer: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playerReducer(state, action: PayloadAction<PLAYER_ACTION>) {
      switch (action.payload.type) {
        case "OPEN_PLAYER": {
          return {
            ...state,
            displayPlayer: true,
          };
        }
        case "CLOSE_PLAYER": {
          return {
            ...state,
            displayPlayer: false,
          };
        }
      }
    },
  },
});

export const playerActions = playerSlice.actions;

export default playerSlice.reducer;
