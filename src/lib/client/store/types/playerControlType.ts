export type PLAYER_REPEAT_MODE = "NONE" | "REPEAT" | "REPEAT_ALL";

export type TRACK = {
  artistEn: string;
  artistKo: string;
  ablumTitle: string;
  ablumArtURL: string;
  audioURL: string;
  trackNo: number;
  trackTitle: string;
};

export type PLAYER_CONTROL_ACTION =
  | { type: "SET_PLAY"; play: boolean }
  | { type: "SET_SHUFFLE"; shuffle: boolean }
  | { type: "SET_REPEAT_MODE"; repeatMode: PLAYER_REPEAT_MODE }
  | {type: "SET_ORIGIN_TRACK_LIST"; originTrackList: Array<TRACK>}
  | { type: "SET_PLAY_LIST"; playList: Array<TRACK> }
  | { type: "SET_CURRENT_TRACK"; currentTrack: TRACK }
  | { type: "SET_TOTAL_TIME"; totalTime: number };
