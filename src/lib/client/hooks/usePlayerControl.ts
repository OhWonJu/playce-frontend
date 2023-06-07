import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@lib/client/store/store";
import { playerControlActions } from "@lib/client/store/reducers";
import { useCallback } from "react";
import { PLAYER_REPEAT_MODE, TRACK } from "../store/types/playerControlType";

export const usePlayerControl = () => {
  const dispatch = useDispatch();

  const { play, shuffle, repeatMode, currentTrack, playList, totalTime } =
    useSelector(({ playerControl }: RootState) => playerControl);

  const setPlay = useCallback(
    (play: boolean) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_PLAY",
          play,
        }),
      ),
    [dispatch],
  );

  const setShuffle = useCallback(
    (shuffle: boolean) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_SHUFFLE",
          shuffle,
        }),
      ),
    [dispatch],
  );

  const setRepeatMode = useCallback(
    (repeatMode: PLAYER_REPEAT_MODE) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_REPEAT_MODE",
          repeatMode,
        }),
      ),
    [dispatch],
  );

  const setcurrentTrack = useCallback(
    (currentTrack: TRACK) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_CURRENT_TRACK",
          currentTrack,
        }),
      ),
    [dispatch],
  );

  const setPlayList = useCallback(
    (playList: Array<TRACK>) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_PLAY_LIST",
          playList,
        }),
      ),
    [dispatch],
  );

  const setTotalTime = useCallback(
    (totalTime: number) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_TOTAL_TIME",
          totalTime,
        }),
      ),
    [dispatch],
  );

  const context = {
    play,
    shuffle,
    repeatMode,
    currentTrack,
    playList,
    totalTime,
    setPlay: (play: boolean) => setPlay(play),
    setShuffle: (shuffle: boolean) => setShuffle(shuffle),
    setRepeatMode: (repeatMode: PLAYER_REPEAT_MODE) =>
      setRepeatMode(repeatMode),
    setcurrentTrack: (currentTrack: TRACK) => setcurrentTrack(currentTrack),
    setPlayList: (playList: Array<TRACK>) => setPlayList(playList),
    setTotalTime: (totalTime: number) => setTotalTime(totalTime),
  };

  return context;
};
