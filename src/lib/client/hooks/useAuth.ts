import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@lib/client/store/store";
import { useCallback } from "react";
import { authActions } from "../store/reducers/authReducer";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { isLogIn, token } = useSelector(({ auth }: RootState) => auth);

  const setAuth = useCallback(
    (param: { isLogIn: boolean; token: string }) =>
      dispatch(
        authActions.setAuth({ isLogIn: param.isLogIn, token: param.token }),
      ),
    [dispatch],
  );

  const context = {
    isLogIn,
    token,
    setAuth: (param: { isLogIn: boolean; token: string }) => setAuth(param),
  };

  return context;
};
