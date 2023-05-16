import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { DROP_DOWN_ACTION } from "@lib/client/store/types";

export type dropDownStateType = {
  displayDropDown: boolean;
  dropDownView: string;
};

const initialState: dropDownStateType = {
  displayDropDown: false,
  dropDownView: "SEARCH_VIEW",
};

const dropDownSlice = createSlice({
  name: "dropDown",
  initialState,
  reducers: {
    dropDownReducer(state, action: PayloadAction<DROP_DOWN_ACTION>) {
      switch (action.payload.type) {
        case "OPEN_DROP_DOWN": {
          return {
            ...state,
            displayDropDown: true,
          };
        }
        case "CLOSE_DROP_DOWN": {
          return {
            ...state,
            displayDropDown: false,
          };
        }
        case "SET_DROP_DOWN_VIEW": {
          return {
            ...state,
            dropDownView: action.payload.view,
          };
        }
      }
    },
  },
});

export const dropDownActions = dropDownSlice.actions;

export default dropDownSlice.reducer;
