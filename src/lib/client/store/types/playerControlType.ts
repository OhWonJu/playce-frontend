import { Track } from "@lib/client/types";

export type PLAY_LIST_TYPE = "ALBUM" | "LIST" | "QUEUE";

export type PLAYER_REPEAT_MODE = "NONE" | "REPEAT" | "REPEAT_ALL";

export type PLAYER_FORWARD_MODE = "INIT" | "FORWARD" | "BACKWARD" | "RESTART";

export type PLAYER_CONTROL_ACTION =
  | { type: "SET_PLAY"; play: boolean }
  | { type: "SET_SHUFFLE"; shuffle: boolean }
  | { type: "SET_REPEAT_MODE"; repeatMode: PLAYER_REPEAT_MODE }
  // | { type: "SET_FORWARD_MODE"; forwardMode: PLAYER_FORWARD_MODE }
  | { type: "SET_FORWARD_TRIGGER" }
  | {
      type: "SET_ORIGIN_TRACK_LIST";
      originTrackId: string;
      originTrackList: Array<Track>;
    }
  | { type: "SET_PLAY_LIST"; playList: Array<Track> }
  | { type: "SET_PLAY_LIST_TYPE"; playListType: PLAY_LIST_TYPE }
  | { type: "ADD_TRACK"; track: Track }
  | { type: "DELETE_TRACK"; track: Track }
  | { type: "SET_CURRENT_TRACK"; currentTrack: Track }
  | { type: "SET_TOTAL_TIME"; totalTime: number };
