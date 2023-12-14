// export const MAX_HEIGHT = "calc(100% - env(safe-area-inset-top) - 34px)";
export const MAX_HEIGHT = "calc(100% - env(safe-area-inset-top))";

export const IS_SSR = typeof window === "undefined";

export const DEFAULT_SPRING_CONFIG = {
  stiffness: 250,
  damping: 30,
  mass: 0.2,
};

export const DRAG_CLOSE_THRESHOLD = 0.4;

export const DRAG_VELOCITY_THRESHOLD = 150;
