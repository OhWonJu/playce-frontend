import React, { useEffect, useState } from "react";

import { useSetPlayTime } from "@lib/client/hooks/usePlayTimeControl";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { Track } from "@lib/client/types";
import { TrackCard } from "@components/ui";

const TrackList = () => {
  const { playList, playListType, currentTrack, setCurrentTrack } =
    usePlayerControl();
  const { setPlayTime } = useSetPlayTime();

  const clickHanlder = (track: Track) => {
    setPlayTime(0);
    setCurrentTrack(track);
  };

  return (
    <div className="flex flex-col w-full h-full space-y-1">
      {playList.map((track: Track, index: number) => (
        <TrackCard
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
