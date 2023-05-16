import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { WINDOW_ACTION } from "@lib/client/store/types";

export type WindowStateType = {
  displayWindow: boolean;
  windowView: string;
};

const initialState: WindowStateType = {
  displayWindow: false,
  windowView: "POLICY_TEST1",
};

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    windowReducer(state, action: PayloadAction<WINDOW_ACTION>) {
      switch (action.payload.type) {
        case "OPEN_WINDOW": {
          return {
            ...state,
            displayWindow: true,
          };
        }
        case "CLOSE_WINDOW": {
          return {
            ...state,
            displayWindow: false,
          };
        }
        case "SET_WINDOW": {
          return {
            ...state,
            windowView: action.payload.view,
          };
        }
      }
    },
  },
});

export const windowActions = windowSlice.actions;

export default windowSlice.reducer;
