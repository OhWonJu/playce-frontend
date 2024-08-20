import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { AlbumFreeView, QueueFreeView, T_Album } from "@lib/client/types";
import { useQueue } from "@lib/client/hooks/useQueue";
import { _GET } from "@lib/server/rootAPI";
import { useMe } from "@lib/client/hooks/useMe";
import { useUI } from "@components/ui";

import { getMyAlbumData } from "./Home.model";
import HomeView from "./Home.view";

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
  const { myAlbumData, isMyAlbumLoading, error } = getMyAlbumData({ id });

  // const {
  //   data: myAlbumData,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["myAlbum"],
  //   queryFn: async () => await _GET(`api/users/${id}/a/albums`),
  //   enabled: !!id,
  //   refetchOnWindowFocus: false,
  // });

  useEffect(() => {
    if (!myAlbumData) return;
    setMyAlbumsData(myAlbumData?.data);
  }, [myAlbumData]);

  const { data: queueData, isLoading: isQueueLoading } = useQuery({
    queryKey: ["myQueue"],
    queryFn: async () => await _GET("api/users/queue"),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!queueData) return;

    setQueueFreeView(queueData?.data);
    setQueue(queueData?.data.tracks);
  }, [queueData]);

  const { data: recommedAlbumsData, isLoading: isRecoLoading } = useQuery({
    queryKey: ["recoAlbums"],
    queryFn: async () => await _GET("api/albums/getAll"),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!recommedAlbumsData) return;
    setRecoAlbums(recommedAlbumsData?.data);
  }, [recommedAlbumsData]);
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

  if (isMyAlbumLoading || isRecoLoading || isQueueLoading) return null;

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
