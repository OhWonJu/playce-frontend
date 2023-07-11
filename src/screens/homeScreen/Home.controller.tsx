import React from "react";

import { useUI } from "@components/ui";

import HomeView from "./Home.view";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { T_Album } from "@lib/client/types";
import { useQueue } from "@lib/client/hooks/useQueue";

const HomeController = () => {
  const { viewMode, closePlayer, displayPlayer, openPlayer } = useUI();
  const {
    play,
    setPlay,
    setOriginTrackList,
    setCurrentTrack,
    setPlayListType,
    doShuffle,
    setPlayList,
    shuffle,
    handlePlayListClick,
  } = usePlayerControl();
  const { queue } = useQueue();

  const togglePlayerClickhandler = () => {
    if (displayPlayer) {
      closePlayer();
    } else {
      // openPlayer();
    }
  };

  const queueClickHandler = () => {
    if (queue.length < 1) return;

    if (!displayPlayer) {
      openPlayer();
    }

    setPlayListType("QUEUE");

    setOriginTrackList(queue);
    setCurrentTrack(queue[0]);

    if (shuffle) {
      doShuffle(queue);
    } else {
      setPlayList(queue);
    }

    setTimeout(() => setPlay(true), 800);
  };

  return (
    <HomeView
      viewMode={viewMode}
      displayPlayer={displayPlayer}
      queueClickHandler={queueClickHandler}
      togglePlayerClickhandler={togglePlayerClickhandler}
    />
  );
};

export default HomeController;
