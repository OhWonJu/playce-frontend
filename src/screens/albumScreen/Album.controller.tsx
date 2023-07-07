import React, { useEffect, useMemo, useState } from "react";

import AlbumView from "./Album.view";
import { artist } from "mock/mock";
import { useRouter } from "next/router";
import { useUI } from "@components/ui";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { T_Album } from "@lib/client/types";

const myAlbums = [
  artist.ADOY.ablums[0],
  artist.BaekYeRin.ablums[0],
  artist.The1975.ablums[0],
];

const AlbumController = () => {
  const router = useRouter();

  const [album, setAlbum] = useState(null);

  useEffect(
    () => setAlbum(myAlbums.find(al => al.title === router.query?.albumId)),
    [router],
  );

  const { openPlayer, displayPlayer } = useUI();
  const {
    setCurrentTrack,
    setPlayList,
    setPlay,
    setOriginTrackList,
    shuffle,
    doShuffle,
    currentTrack,
    play,
  } = usePlayerControl();

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

    if (!play) {
      setTimeout(() => setPlay(true), 800);
    }
  };

  if (!album) return null;

  return <AlbumView album={album} albumClickHandler={albumClickHandler} />;
};

export default AlbumController;
