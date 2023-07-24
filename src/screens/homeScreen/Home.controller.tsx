import React, { useEffect, useState } from "react";

import { useUI } from "@components/ui";

import HomeView from "./Home.view";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { AlbumFreeView, T_Album } from "@lib/client/types";
import { useQueue } from "@lib/client/hooks/useQueue";
import { useQuery } from "@tanstack/react-query";
import { _GET } from "@lib/server/rootAPI";
import { useMe } from "@lib/client/hooks/useMe";

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
  const { id } = useMe();

  const [myAlbumsData, setMyAlbumsData] = useState<{
    albums: AlbumFreeView[];
    own: boolean;
  }>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["myAlbum"],
    queryFn: async () => await _GET(`api/users/${id}/a/albums`),
    onSuccess: data => {
      setMyAlbumsData(data.data);
    },
  });

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
      myAlbumsData={myAlbumsData}
      queueClickHandler={queueClickHandler}
      togglePlayerClickhandler={togglePlayerClickhandler}
    />
  );
};

export default HomeController;
