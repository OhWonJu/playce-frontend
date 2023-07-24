import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { lightTheme, darkTheme } from "src/styles/Theme";

// actions
import {
  dropDownActions,
  modalActions,
  playerActions,
  sidebarActions,
  viewModeActions,
  windowActions,
} from "@lib/client/store/reducers";

// type
// import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import type { RootState } from "@lib/client/store/store";
import type { SIDEBAR_VIEWS } from "@lib/client/store/types/sidebarType";
import type { MODAL_VIEWS } from "@lib/client/store/types/modalType";
import type { DROP_DOWN_VIEWS } from "@lib/client/store/types/dropDownType";
import type { WINDOW_VIEWS } from "@lib/client/store/types/windowType";
import { userAvatarActions } from "@lib/client/store/reducers/userAvatarReducer";
import { useLocalStorage } from "@lib/client/hooks/useLocalStorage";
import { VIEW_MODES } from "@lib/client/store/types/viewModeType";

export const useUI = () => {
  const dispatch = useDispatch();

  // reducers state //
  const { displaySidebar, sidebarView } = useSelector(
    ({ sidebar }: RootState) => sidebar,
  );
  const { displayModal, modalView } = useSelector(
    ({ modal }: RootState) => modal,
  );
  const { displayDropDown, dropDownView } = useSelector(
    ({ dropDown }: RootState) => dropDown,
  );
  const { displayWindow, windowView } = useSelector(
    ({ window }: RootState) => window,
  );
  const { userAvatar } = useSelector(({ userAvatar }: RootState) => userAvatar);
  const { viewMode } = useSelector(({ viewMode }: RootState) => viewMode);
  const { displayPlayer } = useSelector(({ player }: RootState) => player);
  // --------------------------------------------------- //

  const openSidebar = useCallback(
    () => dispatch(sidebarActions.sidebarReducer({ type: "OPEN_SIDEBAR" })),
    [dispatch],
  );
  const closeSidebar = useCallback(
    () => dispatch(sidebarActions.sidebarReducer({ type: "CLOSE_SIDEBAR" })),
    [dispatch],
  );

  const openModal = useCallback(
    () => dispatch(modalActions.modalReducer({ type: "OPEN_MODAL" })),
    [dispatch],
  );

  const closeModal = useCallback(
    () => dispatch(modalActions.modalReducer({ type: "CLOSE_MODAL" })),
    [dispatch],
  );

  const openDropDown = useCallback(
    () => dispatch(dropDownActions.dropDownReducer({ type: "OPEN_DROP_DOWN" })),
    [dispatch],
  );

  const closeDropDown = useCallback(
    () =>
      dispatch(dropDownActions.dropDownReducer({ type: "CLOSE_DROP_DOWN" })),
    [dispatch],
  );

  const openWindow = useCallback(
    () => dispatch(windowActions.windowReducer({ type: "OPEN_WINDOW" })),
    [dispatch],
  );

  const closeWindow = useCallback(
    () => dispatch(windowActions.windowReducer({ type: "CLOSE_WINDOW" })),
    [dispatch],
  );

  const openPlayer = useCallback(
    () => dispatch(playerActions.playerReducer({ type: "OPEN_PLAYER" })),
    [dispatch],
  );

  const closePlayer = useCallback(
    () => dispatch(playerActions.playerReducer({ type: "CLOSE_PLAYER" })),
    [dispatch],
  );

  const toggleSidebar = useCallback(
    () =>
      displaySidebar
        ? dispatch(sidebarActions.sidebarReducer({ type: "CLOSE_SIDEBAR" }))
        : dispatch(sidebarActions.sidebarReducer({ type: "OPEN_SIDEBAR" })),
    [dispatch, displaySidebar],
  );

  const closeSidebarIfPresent = useCallback(
    () =>
      displaySidebar &&
      dispatch(sidebarActions.sidebarReducer({ type: "CLOSE_SIDEBAR" })),
    [dispatch, displaySidebar],
  );

  const setSidebarView = useCallback(
    (view: SIDEBAR_VIEWS) =>
      dispatch(
        sidebarActions.sidebarReducer({ type: "SET_SIDEBAR_VIEW", view }),
      ),
    [dispatch],
  );

  const setModalView = useCallback(
    (view: MODAL_VIEWS) =>
      dispatch(modalActions.modalReducer({ type: "SET_MODAL_VIEW", view })),
    [dispatch],
  );

  const setDropDownView = useCallback(
    (view: DROP_DOWN_VIEWS) =>
      dispatch(
        dropDownActions.dropDownReducer({ type: "SET_DROP_DOWN_VIEW", view }),
      ),
    [dispatch],
  );

  const setWindowView = useCallback(
    (view: WINDOW_VIEWS) =>
      dispatch(windowActions.windowReducer({ type: "SET_WINDOW", view })),
    [dispatch],
  );

  const setUserAvatar = useCallback(
    (value: string) =>
      dispatch(
        userAvatarActions.userAvatarReducer({ type: "SET_USER_AVATAR", value }),
      ),
    [dispatch],
  );

  const setViewMode = useCallback(
    (view: VIEW_MODES) =>
      dispatch(
        viewModeActions.viewModeReducer({ type: "SET_VIEW_MODE", view }),
      ),
    [dispatch],
  );

  const context = {
    displaySidebar,
    sidebarView,
    displayModal,
    modalView,
    displayDropDown,
    dropDownView,
    displayWindow,
    displayPlayer,
    windowView,
    userAvatar,
    viewMode,
    openSidebar: () => openSidebar(),
    closeSidebar: () => closeSidebar(),
    openModal: () => openModal(),
    closeModal: () => closeModal(),
    openDropDown: () => openDropDown(),
    closeDropDown: () => closeDropDown(),
    openWindow: () => openWindow(),
    closeWindow: () => closeWindow(),
    openPlayer: () => openPlayer(),
    closePlayer: () => closePlayer(),
    toggleSidebar: () => toggleSidebar(),
    closeSidebarIfPresent: () => closeSidebarIfPresent(),
    setSidebarView: (view: SIDEBAR_VIEWS) => setSidebarView(view),
    setModalView: (view: MODAL_VIEWS) => setModalView(view),
    setDropDownView: (view: DROP_DOWN_VIEWS) => setDropDownView(view),
    setWindowView: (view: WINDOW_VIEWS) => setWindowView(view),
    setUserAvatar: (value: string) => setUserAvatar(value),
    setViewMode: (view: VIEW_MODES) => setViewMode(view),
  };

  return context;
};

export const ManagedUIContext: FC<any> = ({ children }) => {
  // const theme = useLocalStorage("theme");
  const [localTheme, _] = useLocalStorage("theme");

  let themeMode = useMemo((): string => {
    if (localTheme) return localTheme;
    else
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }, [localTheme]);

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};
