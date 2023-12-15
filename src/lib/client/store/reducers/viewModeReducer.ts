import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { VIEW_MODES, VIEW_MODE_ACTION } from "../types/viewModeType";

export type ViewModeStateType = {
  viewMode: VIEW_MODES;
};

const initialState: ViewModeStateType = {
  viewMode: "INIT",
};

const viewModeSlice = createSlice({
  name: "viewMode",
  initialState,
  reducers: {
    viewModeReducer(_, action: PayloadAction<VIEW_MODE_ACTION>) {
      switch (action.payload.type) {
        case "SET_VIEW_MODE": {
          return {
            viewMode: action.payload.view,
          };
        }
      }
    },
  },
});

export const viewModeActions = viewModeSlice.actions;

export default viewModeSlice.reducer;
