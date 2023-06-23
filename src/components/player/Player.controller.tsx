import React, { useEffect, useState } from "react";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

import { useUI } from "@components/ui";
import PlayerDesktopView from "./Player.Desktop.view";
import PlayerMobileView from "./Player.Mobile.view";

const PlayerController = () => {
  const { viewMode } = useUI();
  const { currentTrack, setCurrentTrack, setPlayList, shuffle, playList } =
    usePlayerControl();

  // const adoy = artist.ADOY;
  // const album = artist.ADOY.ablums[0];

  // const originPlayList = album.tracks.map((track, index) => {
  //   return {
  //     artistEn: adoy.nameEn,
  //     artistKo: adoy.nameKr,
  //     ablumTitle: album.title,
  //     ablumArtURL: album.art,
  //     audioURL: track.url,
  //     trackNo: index + 1,
  //     trackTitle: track.title,
  //   };
  // });

  // // Fisher-Yates Shuffle
  // const doShuffle = (array: Array<TRACK>) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }

  //   return array;
  // };

  // useEffect(() => {
  //   if (shuffle) {
  //     const currentIndex = playList.findIndex(
  //       el => el.trackTitle == currentTrack.trackTitle,
  //     );

  //     const prevList = [...playList];
  //     prevList.splice(currentIndex, 1);

  //     let shuffledList = doShuffle(prevList);
  //     shuffledList = [currentTrack, ...shuffledList];

  //     setPlayList(shuffledList);
  //     setCurrentTrack(currentTrack === null ? shuffledList[0] : currentTrack);
  //   } else {
  //     setPlayList(originPlayList);
  //     setCurrentTrack(currentTrack === null ? originPlayList[0] : currentTrack);
  //   }
  // }, [shuffle]);

  if (viewMode !== "DESKTOP") return <PlayerMobileView />;
  else return <PlayerDesktopView />;
};

export default PlayerController;
