import React from "react";
import dynamic from "next/dynamic";
import { useMotionValue } from "framer-motion";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

import {
  DESKTOP_PLAYER_WIDTH,
  NAV_HEIGHT,
  WAVE_FORM_HEIGHT,
} from "constants/constants";

import {
  AlbumArt,
  ForwardButton,
  PlayButton,
  PlayTimer,
  RepeatButton,
  ShuffleButton,
} from "./modules";
import { DotMenu } from "@components/icons";
import { TRACK } from "@lib/client/store/types/playerControlType";
import { useSetPlayTime } from "@lib/client/hooks/usePlayTimeControl";
import { Track } from "@components/ui";

const DynamicWaveform = dynamic(() => import("./modules/Waveform"), {
  ssr: false,
});

interface PlayerDesktopViewProps {}

const PlayerDesktopView: React.FC<PlayerDesktopViewProps> = ({}) => {
  const { play, currentTrack, playList, playListType, setCurrentTrack } =
    usePlayerControl();
  const { setPlayTime } = useSetPlayTime();

  const pinOpacity = useMotionValue(1);

  const clickHanlder = (track: TRACK) => {
    setPlayTime(0);
    setCurrentTrack(track);
  };

  return (
    <div
      className="__WRAPPER__ absolute right-0 flex flex-col px-4 shadow-inner"
      style={{
        width: DESKTOP_PLAYER_WIDTH,
        minHeight: 667,
        maxHeight: `calc(100vh - ${NAV_HEIGHT}px)`, // NAV 이격
        top: NAV_HEIGHT,
        zIndex: 60,
      }}
    >
      {/* HEADER */}
      <section
        className="__HEADER__ relative flex w-full justify-end items-center mb-1"
        style={{ minHeight: 50 }}
      >
        <div className="flex justify-center items-center h-full aspect-square rounded-full">
          <DotMenu className="w-5 h-5" />
        </div>
      </section>

      {/* CONTENT */}
      <section
        className="__CONTENT__ flex flex-col w-full h-full items-center"
        style={{ height: `calc(50vh) - ${25}px` }}
      >
        <div className="__ALBUM__ w-full aspect-square p-1">
          <AlbumArt
            artURL={currentTrack?.ablumArtURL}
            isPlay={play}
            pinOpacity={pinOpacity}
          />
        </div>
        <div className="__PLAYER_CONTROLL__ flex flex-col w-full">
          {/* TRACK INFO */}
          <section className="__TRACK_INFO__ flex flex-col items-center w-full mb-2">
            <div className="__TRACK_TITLE__ font-extrabold text-3xl max-w-full overflow-hidden">
              {currentTrack?.trackTitle}
            </div>
            <div className="__ARTIST__ font-bold text-base">
              {currentTrack?.artistEn}
            </div>
          </section>
          {/* WAVE FORM  */}
          <section
            className="__WAVE_FORM_CONTAINER__ relative mb-1 w-full overflow-hidden"
            style={{ height: WAVE_FORM_HEIGHT }}
          >
            <div className="absolute w-full h-full bottom-[15.5px]">
              <DynamicWaveform />
            </div>
          </section>
          {/* PLAY TIME INDICATOER */}
          <section className="flex w-full justify-between font-semibold text-xs">
            <PlayTimer />
          </section>
          {/* CONTROLLER */}
          <section className="__CONTROLLER__ flex w-full justify-between items-center ">
            <ShuffleButton />
            <ForwardButton isForward={false} />
            <PlayButton />
            <ForwardButton isForward={true} />
            <RepeatButton />
          </section>
        </div>
      </section>

      {/* TRACK LIST */}
      <section
        className="__TRACK_LIST__ flex flex-col w-full mt-4 pb-4 space-y-1 overflow-y-scroll scrollbar-hide"
        style={{ height: `calc(50vh - ${25}px)` }}
      >
        {playList.map((track: TRACK, index: number) => (
          <Track
            key={index + track.trackTitle + playListType} // list 간의 전환이 있는 경우 index + track 조합이 같으면 같은 컴포넌트라 생각하는 것 같음.
            data={track}
            trackListType={playListType}
            focused={currentTrack.trackTitle === track.trackTitle}
            clickHandler={() => clickHanlder(track)}
          />
        ))}
      </section>
    </div>
  );
};

export default PlayerDesktopView;
