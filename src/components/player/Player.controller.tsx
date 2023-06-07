import React, { useEffect, useState } from "react";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

import PlayerView from "./Player.view";
import { artist } from "mock/adoy";

const PlayerController = () => {
  const { setcurrentTrack, setPlayList } = usePlayerControl();

  const adoy = artist.ADOY;
  const album = artist.ADOY.ablums[0];

  const originPlayList = album.tracks.map((track, index) => {
    return {
      artistEn: adoy.nameEn,
      artistKo: adoy.nameKr,
      ablumTitle: album.title,
      ablumArtURL: album.art,
      audioURL: track.url,
      trackNo: index + 1,
      trackTitle: track.title,
    };
  });

  useEffect(() => {
    setcurrentTrack(originPlayList[0]);
    setPlayList(originPlayList);
  }, []);

  return <PlayerView />;
};

export default PlayerController;
