import React, { useEffect, useState } from "react";

import { useSetPlayTime } from "@lib/client/hooks/usePlayTimeControl";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { TRACK } from "@lib/client/store/types/playerControlType";
import { Track } from "@components/ui";

const TrackList = () => {
  const { playList, playListType, currentTrack, setCurrentTrack } =
    usePlayerControl();
  const { setPlayTime } = useSetPlayTime();

  const clickHanlder = (track: TRACK) => {
    setPlayTime(0);
    setCurrentTrack(track);
  };

  return (
    <div className="flex flex-col w-full h-full space-y-1">
      {playList.map((track: TRACK, index: number) => (
        <Track
          key={index + track.trackTitle + playListType}
          data={track}
          trackListType={playListType}
          focused={currentTrack.trackTitle === track.trackTitle}
          clickHandler={() => clickHanlder(track)}
        />
      ))}
    </div>
  );
};

export default TrackList;
