import React from "react";

import { useUI } from "@components/ui";

import HomeView from "./Home.view";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { T_Album } from "@lib/client/types";

const HomeController = () => {
  const { viewMode, closePlayer, displayPlayer, openPlayer } = useUI();
  const {
    currentTrack,
    setOriginTrackList,
    setCurrentTrack,
    setPlay,
    doShuffle,
    setPlayList,
    shuffle,
  } = usePlayerControl();

  const togglePlayerClickhandler = () => {
    if (displayPlayer) {
      closePlayer();
    } else {
      // openPlayer();
    }
  };

  // current Play List , Origin Play List를 상태로 둬야할 것 같음
  // origin 이 바뀌면 리셋하는 형태로 가야함...

  const albumClickHandler = (album: T_Album) => {
    if (!displayPlayer) {
      openPlayer();
    }

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
  };

  return (
    <HomeView
      viewMode={viewMode}
      displayPlayer={displayPlayer}
      albumClickHandler={albumClickHandler}
      togglePlayerClickhandler={togglePlayerClickhandler}
    />
  );
};

export default HomeController;
