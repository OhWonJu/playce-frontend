import React from "react";
import Image from "next/image";

import { useSetPlayTime } from "@lib/client/hooks/usePlayTimeControl";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import useTheme from "@lib/client/hooks/useTheme";
import { TRACK } from "@lib/client/store/types/playerControlType";

const TrackList = () => {
  const theme = useTheme();

  const { playList, currentTrack, setCurrentTrack } = usePlayerControl();
  const { setPlayTime } = useSetPlayTime();

  return (
    <>
      {playList.map((track: TRACK, index: number) => (
        <div
          key={index}
          className="flex w-full min-h-[60px] items-center p-2 rounded-md"
          style={{
            backgroundColor:
              currentTrack.trackTitle === track.trackTitle
                ? theme.gray_light + 70
                : "",
          }}
          onClick={() => {
            setPlayTime(0);
            setCurrentTrack(track);
          }}
        >
          <div className="relative h-full aspect-square rounded-full overflow-hidden mr-2">
            <Image
              src={track.ablumArtURL}
              alt="product image"
              layout="fill"
              sizes="100%"
              draggable={false}
            />
          </div>
          <div className="flex flex-col">
            <a className="font-semibold text-base">{track.trackTitle}</a>
            <a className="font-medium text-xs">{track.artistKo}</a>
          </div>
        </div>
      ))}
    </>
  );
};

export default TrackList;
