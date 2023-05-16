export type DROP_DOWN_VIEWS = "SEARCH_VIEW" | "STORE_VIEW" | "TEST_VIEW2";

export type DROP_DOWN_ACTION =
  | {
      type: "OPEN_DROP_DOWN";
    }
  | {
      type: "CLOSE_DROP_DOWN";
    }
  | {
      type: "SET_DROP_DOWN_VIEW";
      view: DROP_DOWN_VIEWS;
    };
