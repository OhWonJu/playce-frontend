import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  PLAYER_CONTROL_ACTION,
  PLAYER_FORWARD_MODE,
  PLAYER_REPEAT_MODE,
  PLAY_LIST_TYPE,
} from "../types/playerControlType";
import { Track } from "@lib/client/types";

export type PlayerControlStateType = {
  play: boolean;
  shuffle: boolean;
  repeatMode: PLAYER_REPEAT_MODE;
  forwardMode: PLAYER_FORWARD_MODE;
  forwardTrigger: number;
  originTrackList: Array<Track>;
  playList: Array<Track>;
  playListType: PLAY_LIST_TYPE;
  currentTrack: Track;
  totalTime: number;
};

const initialState: PlayerControlStateType = {
  play: false,
  shuffle: false,
  repeatMode: "NONE",
  forwardMode: "INIT",
  forwardTrigger: 0,
  originTrackList: [],
  currentTrack: null,
  playList: [],
  playListType: "ALBUM",
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
        // case "SET_FORWARD_MODE": {
        //   return {
        //     ...state,
        //     forwardMode: aciton.payload.forwardMode,
        //   };
        // }
        case "SET_FORWARD_TRIGGER": {
          const newForwardTrigger = state.forwardTrigger === 0 ? 1 : 0;
          return {
            ...state,
            forwardTrigger: newForwardTrigger,
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
        case "SET_PLAY_LIST_TYPE": {
          return {
            ...state,
            playListType: aciton.payload.playListType,
          };
        }
        case "ADD_TRACK": {
          const newTrack = aciton.payload.track;
          const newOriginPlayList = [...state.originTrackList];
          const newPlayList = [...state.playList];
          const existTrack = newPlayList.findIndex(
            track => track.trackTitle === newTrack.trackTitle,
          );
          if (existTrack === -1) {
            newOriginPlayList.push(newTrack);
            newPlayList.push(newTrack);
            return {
              ...state,
              originTrackList: newOriginPlayList,
              playList: newPlayList,
            };
          } else return { ...state };
        }
        case "DELETE_TRACK": {
          const deletedTrack = aciton.payload.track;
          const deletedTrackIndex = state.playList.findIndex(
            track => track.trackTitle === deletedTrack.trackTitle,
          );

          if (deletedTrackIndex !== -1) {
            const deletedOriginTrackIndex = state.originTrackList.findIndex(
              track => track.trackTitle === deletedTrack.trackTitle,
            );

            const newOriginPlayList = [...state.originTrackList];
            const newPlayList = [...state.playList];
            newOriginPlayList.splice(deletedOriginTrackIndex, 1);
            newPlayList.splice(deletedTrackIndex, 1);
            return {
              ...state,
              originTrackList: newOriginPlayList,
              playList: newPlayList,
            };
          } else return { ...state };
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
