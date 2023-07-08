import { TRACK } from "./playerControlType";

export type QUEUE_ACTION =
  | { type: "SET_QUEUE"; queue: Array<TRACK> }
  | { type: "ADD_TRACK"; track: TRACK }
  | { type: "DELETE_TRACK"; track: TRACK }
  | { type: "INIT_QUEUE" };
