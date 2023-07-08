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
  const { play, handlePlayListClick, setPlay } = usePlayerControl();

  const albumClickHandler = (album: T_Album) => {
    if (!displayPlayer) {
      openPlayer();
    }

    handlePlayListClick("ALBUM", album);

    setTimeout(() => setPlay(true), 800);
  };

  if (!album) return null;

  return <AlbumView album={album} albumClickHandler={albumClickHandler} />;
};

export default AlbumController;
