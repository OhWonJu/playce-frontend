import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { SIDEBAR_ACTION } from "@lib/client/store/types";

export type SidebarStateType = {
  displaySidebar: boolean;
  sidebarView: string;
};

const initialState: SidebarStateType = {
  displaySidebar: false,
  sidebarView: "CART_VIEW",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    sidebarReducer(state, action: PayloadAction<SIDEBAR_ACTION>) {
      switch (action.payload.type) {
        case "OPEN_SIDEBAR": {
          return {
            ...state,
            displaySidebar: true,
          };
        }
        case "CLOSE_SIDEBAR": {
          return {
            ...state,
            displaySidebar: false,
          };
        }
        case "SET_SIDEBAR_VIEW": {
          return {
            ...state,
            sidebarView: action.payload.view,
          };
        }
      }
    },
  },
});

export const sidebarActions = sidebarSlice.actions;

export default sidebarSlice.reducer;
