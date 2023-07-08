export type TRACK = {
  artistEn: string;
  artistKo: string;
  ablumTitle: string;
  ablumArtURL: string;
  audioURL: string;
  trackNo: number;
  trackTitle: string;
};

export type PLAY_LIST_TYPE = "ALBUM" | "LIST" | "QUEUE";

export type PLAYER_REPEAT_MODE = "NONE" | "REPEAT" | "REPEAT_ALL";

export type PLAYER_FORWARD_MODE = "INIT" | "FORWARD" | "BACKWARD" | "RESTART";

export type PLAYER_CONTROL_ACTION =
  | { type: "SET_PLAY"; play: boolean }
  | { type: "SET_SHUFFLE"; shuffle: boolean }
  | { type: "SET_REPEAT_MODE"; repeatMode: PLAYER_REPEAT_MODE }
  | { type: "SET_FORWARD_MODE"; forwardMode: PLAYER_FORWARD_MODE }
  | { type: "SET_ORIGIN_TRACK_LIST"; originTrackList: Array<TRACK> }
  | { type: "SET_PLAY_LIST"; playList: Array<TRACK> }
  | { type: "SET_PLAY_LIST_TYPE"; playListType: PLAY_LIST_TYPE }
  | { type: "ADD_TRACK"; track: TRACK }
  | { type: "DELETE_TRACK"; track: TRACK }
  | { type: "SET_CURRENT_TRACK"; currentTrack: TRACK }
  | { type: "SET_TOTAL_TIME"; totalTime: number };
