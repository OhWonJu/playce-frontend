import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  PLAYER_CONTROL_ACTION,
  PLAYER_FORWARD_MODE,
  PLAYER_REPEAT_MODE,
  TRACK,
} from "../types/playerControlType";

export type PlayerControlStateType = {
  play: boolean;
  shuffle: boolean;
  repeatMode: PLAYER_REPEAT_MODE;
  forwardMode: PLAYER_FORWARD_MODE;
  originTrackList: Array<TRACK>;
  playList: Array<TRACK>;
  currentTrack: TRACK;
  totalTime: number;
};

const initialState: PlayerControlStateType = {
  play: false,
  shuffle: false,
  repeatMode: "NONE",
  forwardMode: "INIT",
  originTrackList: [],
  currentTrack: null,
  playList: [],
  totalTime: 0,
};

const playerControlSlice = createSlice({
  name: "playControl",
  initialState,
  reducers: {
    playerControlReducer(state, aciton: PayloadAction<PLAYER_CONTROL_ACTION>) {
      switch (aciton.payload.type) {
        case "SET_PLAY": {
          return {
            ...state,
            play: aciton.payload.play,
          };
        }
        case "SET_SHUFFLE": {
          return {
            ...state,
            shuffle: aciton.payload.shuffle,
          };
        }
        case "SET_REPEAT_MODE": {
          return {
            ...state,
            repeatMode: aciton.payload.repeatMode,
          };
        }
        case "SET_FORWARD_MODE": {
          return {
            ...state,
            forwardMode: aciton.payload.forwardMode,
          };
        }
        case "SET_ORIGIN_TRACK_LIST": {
          return {
            ...state,
            originTrackList: aciton.payload.originTrackList,
          };
        }
        case "SET_CURRENT_TRACK": {
          return {
            ...state,
            currentTrack: aciton.payload.currentTrack,
          };
        }
        case "SET_PLAY_LIST": {
          return {
            ...state,
            playList: aciton.payload.playList,
          };
        }
        case "SET_TOTAL_TIME": {
          return {
            ...state,
            totalTime: aciton.payload.totalTime,
          };
        }
      }
    },
  },
});

export const playerControlActions = playerControlSlice.actions;

export default playerControlSlice.reducer;
