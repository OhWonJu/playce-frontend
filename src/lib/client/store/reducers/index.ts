import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";
import type { AnyAction, CombinedState } from "@reduxjs/toolkit";

// reducers & actions //
import authReducer, { authStateType } from "./authReducer";
import meReducer, { meStateType } from "./meReducer";
import sidebarReducer, { SidebarStateType } from "./sidebarReducer";
import modalReducer, { ModalStateType } from "./modalReducer";
import dropDownReducer, { dropDownStateType } from "./dropDownReducer";
import windowReducer, { WindowStateType } from "./windowReducer";
import userAvatarReducer, { UserAvatarStateType } from "./userAvatarReducer";
import viewModeReducer, { ViewModeStateType } from "./viewModeReducer";
import playerReducer, { PlayerStateType } from "./playerReducer";
import playerControlReducer, {
  PlayerControlStateType,
} from "./playerControlReducer";
import playTimeReducer, { PlayTimeStateType } from "./playTimeReducer";
import queueReducer, { QueueStateType } from "./queueReducer";

// actions //
export { sidebarActions } from "./sidebarReducer";
export { modalActions } from "./modalReducer";
export { dropDownActions } from "./dropDownReducer";
export { windowActions } from "./windowReducer";
export { userAvatarActions } from "./userAvatarReducer";
export { viewModeActions } from "./viewModeReducer";
export { playerActions } from "./playerReducer";
export { playerControlActions } from "./playerControlReducer";
export { playTimeActions } from "./playTimeReducer";
export { queueActions } from "./queueReducer";

type ReducerState = {
  auth: authStateType;
  me: meStateType;
  sidebar: SidebarStateType;
  modal: ModalStateType;
  dropDown: dropDownStateType;
  window: WindowStateType;
  userAvatar: UserAvatarStateType;
  viewMode: ViewModeStateType;
  player: PlayerStateType;
  playerControl: PlayerControlStateType;
  playTimeControl: PlayTimeStateType;
  queue: QueueStateType;
};

// 원래 "rootReducer"로 합쳐줄 필요 없이 "configureStore()"에서 합칠 수 있지만 "HYDRATE"를 위해서 사용
const rootReducer = (
  state: any,
  action: AnyAction,
): CombinedState<ReducerState> => {
  switch (action.type) {
    // SSR을 위해서 사용 ( "next.js"의 "getServerSideProps()" )
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return combineReducers({
        auth: authReducer,
        me: meReducer,
        sidebar: sidebarReducer,
        modal: modalReducer,
        dropDown: dropDownReducer,
        window: windowReducer,
        userAvatar: userAvatarReducer,
        viewMode: viewModeReducer,
        player: playerReducer,
        playerControl: playerControlReducer,
        playTimeControl: playTimeReducer,
        queue: queueReducer,
      })(state, action);
  }
};

export default rootReducer;
