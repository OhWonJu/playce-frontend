import React, { useEffect, useState } from "react";

import { useUI } from "@components/ui";

import HomeView from "./Home.view";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { AlbumFreeView, QueueFreeView, T_Album } from "@lib/client/types";
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
  } = usePlayerControl();
  const { queue, setQueue } = useQueue();
  const { id } = useMe();

  const [myAlbumsData, setMyAlbumsData] = useState<{
    albums: AlbumFreeView[];
    own: boolean;
  }>(null);
  const [queueFreeView, setQueueFreeView] = useState<QueueFreeView>(null);
  const [recoAlbums, setRecoAlbums] = useState<AlbumFreeView[]>(null);

  // QUERY ========================================================== //
  const { data, isLoading, error } = useQuery({
    queryKey: ["myAlbum"],
    queryFn: async () => await _GET(`api/users/${id}/a/albums`),
    enabled: id !== null,
    refetchOnWindowFocus: false,
    onSuccess: data => {
      setMyAlbumsData(data.data);
    },
  });

  const { data: queueData, isLoading: queueLoading } = useQuery({
    queryKey: ["myQueue"],
    queryFn: async () => await _GET("api/users/queue"),
    enabled: id !== null,
    refetchOnWindowFocus: false,
    onSuccess: data => {
      setQueueFreeView(data.data);
      setQueue(data.data.tracks);
    },
  });

  const { isLoading: recoLoading } = useQuery({
    queryKey: ["recoAlbums"],
    queryFn: async () => await _GET("api/albums/getAll"),
    refetchOnWindowFocus: false,
    onSuccess: data => {
      setRecoAlbums(data.data);
    },
  });
  // ========================================================== QUERY //

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

    setOriginTrackList("queue", queue);
    setCurrentTrack(queue[0]);

    if (shuffle) {
      doShuffle(queue);
    } else {
      setPlayList(queue);
    }

    setTimeout(() => setPlay(true), 800);
  };

  if (isLoading || recoLoading || queueLoading) return null;

  return (
    <HomeView
      viewMode={viewMode}
      displayPlayer={displayPlayer}
      myAlbumsData={myAlbumsData}
      queueData={queueFreeView}
      recommendAlbumsData={recoAlbums}
      queueClickHandler={queueClickHandler}
      togglePlayerClickhandler={togglePlayerClickhandler}
    />
  );
};

export default HomeController;
