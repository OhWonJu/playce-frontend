import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@lib/client/store/store";
import { playerControlActions } from "@lib/client/store/reducers";
import { useCallback } from "react";
import {
  PLAYER_FORWARD_MODE,
  PLAYER_REPEAT_MODE,
  PLAY_LIST_TYPE,
  TRACK,
} from "../store/types/playerControlType";
import { T_Album } from "../types";
import { useUI } from "@components/ui";

export const usePlayerControl = () => {
  const dispatch = useDispatch();

  const {
    play,
    shuffle,
    repeatMode,
    forwardMode,
    originTrackList,
    playList,
    playListType,
    currentTrack,
    totalTime,
  } = useSelector(({ playerControl }: RootState) => playerControl);

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

  const setForwardMode = useCallback(
    (forwardMode: PLAYER_FORWARD_MODE) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_FORWARD_MODE",
          forwardMode,
        }),
      ),
    [dispatch],
  );

  const setOriginTrackList = useCallback(
    (originTrackList: Array<TRACK>) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_ORIGIN_TRACK_LIST",
          originTrackList,
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

  const addTrack = useCallback(
    (track: TRACK) =>
      dispatch(
        playerControlActions.playerControlReducer({ type: "ADD_TRACK", track }),
      ),
    [dispatch],
  );

  const deleteTrack = useCallback(
    (track: TRACK) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "DELETE_TRACK",
          track,
        }),
      ),
    [dispatch],
  );

  const setPlayListType = useCallback(
    (playListType: PLAY_LIST_TYPE) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_PLAY_LIST_TYPE",
          playListType,
        }),
      ),
    [dispatch],
  );

  const setCurrentTrack = useCallback(
    (currentTrack: TRACK) =>
      dispatch(
        playerControlActions.playerControlReducer({
          type: "SET_CURRENT_TRACK",
          currentTrack,
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

  const doShuffle = useCallback(
    (list: Array<TRACK>) => {
      if (shuffle) {
        const currentIndex = list.findIndex(
          track => track.trackTitle === currentTrack.trackTitle,
        );

        const prevList = [...list];

        if (currentIndex !== -1) prevList.splice(currentIndex, 1);

        // Fisher-Yates Shuffle
        for (let i = prevList.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [prevList[i], prevList[j]] = [prevList[j], prevList[i]];
        }

        const shuffledList =
          currentIndex !== -1 ? [currentTrack, ...prevList] : [...prevList];

        setPlayList(shuffledList);
        setCurrentTrack(currentIndex === -1 ? shuffledList[0] : currentTrack);
      } else {
        setPlayList(originTrackList);
        setCurrentTrack(
          currentTrack === null ? originTrackList[0] : currentTrack,
        );
      }
    },
    [shuffle, currentTrack],
  );

  const handlePlayListClick = (
    playListType: PLAY_LIST_TYPE,
    album: T_Album,
  ) => {
    setPlayListType(playListType);

    const TrackList = album.tracks.map((track: any, index: number) => {
      return {
        artistEn: album.nameEn,
        artistKo: album.nameKr,
        ablumTitle: album.title,
        ablumArtURL: album.art,
        audioURL: track.url,
        trackNo: index + 1,
        trackTitle: track.title,
      };
    });

    const currentIndex = currentTrack
      ? TrackList.findIndex(
          (track: any) => track.trackTitle === currentTrack.trackTitle,
        )
      : -1;

    if (currentIndex === -1) setPlay(false);
    setOriginTrackList(TrackList);
    setCurrentTrack(currentIndex === -1 ? TrackList[0] : currentTrack);

    if (shuffle) {
      doShuffle(TrackList);
    } else {
      setPlayList(TrackList);
    }

    //  if (!play) {
    //   setTimeout(() => setPlay(true), 800);
    // }
  };

  const context = {
    play,
    shuffle,
    repeatMode,
    forwardMode,
    originTrackList,
    playList,
    playListType,
    currentTrack,
    totalTime,
    setPlay: (play: boolean) => setPlay(play),
    setShuffle: (shuffle: boolean) => setShuffle(shuffle),
    setRepeatMode: (repeatMode: PLAYER_REPEAT_MODE) =>
      setRepeatMode(repeatMode),
    setForwardMode: (forwardMode: PLAYER_FORWARD_MODE) =>
      setForwardMode(forwardMode),
    setOriginTrackList: (originTrackList: Array<TRACK>) =>
      setOriginTrackList(originTrackList),
    setPlayList: (playList: Array<TRACK>) => setPlayList(playList),
    addTrack: (track: TRACK) => addTrack(track),
    deleteTrack: (track: TRACK) => deleteTrack(track),
    setPlayListType: (playListType: PLAY_LIST_TYPE) =>
      setPlayListType(playListType),
    setCurrentTrack: (currentTrack: TRACK) => setCurrentTrack(currentTrack),
    setTotalTime: (totalTime: number) => setTotalTime(totalTime),
    doShuffle: (list: Array<TRACK>) => doShuffle(list),
    handlePlayListClick: (playListType: PLAY_LIST_TYPE, album: T_Album) =>
      handlePlayListClick(playListType, album),
  };

  return context;
};
