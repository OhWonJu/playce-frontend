export type WINDOW_VIEWS = "POLICY_TEST1" | "POLICY_TEST2" | "POLICY_TEST3" | "POLICY_TEST4";

export type WINDOW_ACTION =
  | {
      type: "OPEN_WINDOW";
    }
  | {
      type: "CLOSE_WINDOW";
    }
  | {
      type: "SET_WINDOW";
      view: WINDOW_VIEWS;
    };
