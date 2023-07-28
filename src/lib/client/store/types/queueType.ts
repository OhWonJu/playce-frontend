import { Track } from "@lib/client/types";

export type QUEUE_ACTION =
  | { type: "SET_QUEUE"; queue: Array<Track> }
  | { type: "ADD_TRACK"; track: Track }
  | { type: "DELETE_TRACK"; track: Track }
  | { type: "INIT_QUEUE" };
