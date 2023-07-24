import React, { useEffect, useMemo, useState } from "react";

import AlbumView from "./Album.view";
import { artist } from "mock/mock";
import { useRouter } from "next/router";
import { useUI } from "@components/ui";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { AlbumDetail, T_Album } from "@lib/client/types";
import { useQuery } from "@tanstack/react-query";
import { _GET } from "@lib/server/rootAPI";

const myAlbums = [
  artist.ADOY.ablums[0],
  artist.BaekYeRin.ablums[0],
  artist.The1975.ablums[0],
];

const AlbumController = () => {
  const router = useRouter();

  const [album, setAlbum] = useState<AlbumDetail>(null);
  const [albumId, setAlbumId] = useState(null);
  const [own, setOwn] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["albums"],
    queryFn: async () => await _GET(`api/albums/${albumId}`),
    enabled: albumId !== null,
    onSuccess: data => {
      setAlbum(data.data);
    },
  });

  useEffect(() => {
    setAlbumId(router.query?.id);
    setOwn(Boolean(router.query?.isOwn));
  }, [router]);

  const { openPlayer, displayPlayer } = useUI();
  const { play, handlePlayListClick, setPlay } = usePlayerControl();

  const albumClickHandler = (album: AlbumDetail) => {
    if (!displayPlayer) {
      openPlayer();
    }

    handlePlayListClick("ALBUM", album);

    setTimeout(() => setPlay(true), 800);
  };

  if (isLoading || album === null) return null;

  return (
    <AlbumView
      album={album}
      isOwn={own}
      albumClickHandler={albumClickHandler}
    />
  );
};

export default AlbumController;
