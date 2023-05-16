export type SIDEBAR_VIEWS =
  | "CART_VIEW"
  | "CHECKOUT_VIEW"
  | "PAYMENT_METHOD_VIEW"
  | "MOBILE_NAV_VIEW";

export type SIDEBAR_ACTION =
  | {
      type: "OPEN_SIDEBAR";
    }
  | {
      type: "CLOSE_SIDEBAR";
    }
  | {
      type: "SET_SIDEBAR_VIEW";
      view: SIDEBAR_VIEWS;
    };
