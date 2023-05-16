export type VIEW_MODES = "INIT" | "MOBILE" | "TABLET" | "DESKTOP";

export type VIEW_MODE_ACTION = {
  type: "SET_VIEW_MODE";
  view: VIEW_MODES;
};
