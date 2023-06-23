import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { animate, useMotionValue, useTransform } from "framer-motion";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

import {
  DESKTOP_PLAYER_WIDTH,
  NAV_HEIGHT,
  PLAYER_HEADER_HEIGHT,
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
import Image from "next/image";

const DynamicWaveform = dynamic(() => import("./modules/Waveform"), {
  ssr: false,
});

interface PlayerDesktopViewProps {}

const PlayerDesktopView: React.FC<PlayerDesktopViewProps> = ({}) => {
  const { play, currentTrack, playList, setCurrentTrack } = usePlayerControl();
  const { setPlayTime } = useSetPlayTime();

  const pinOpacity = useMotionValue(1);

  return (
    <div
      className="__WRAPPER__ absolute right-0 flex flex-col px-4 shadow-inner"
      style={{
        width: DESKTOP_PLAYER_WIDTH,
        minHeight: 667,
        maxHeight: `calc(100vh - ${NAV_HEIGHT}px)`,
        top: NAV_HEIGHT,
        // marginTop: NAV_HEIGHT,
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
          <section className="flex w-full justify-between font-semibold text-xs mb-7">
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
        className="__TRACK_LIST__ flex flex-col w-full mt-4 pb-4 space-y-4 overflow-y-scroll scrollbar-hide"
        style={{ height: `calc(50vh - ${25}px)` }}
      >
        {playList.map((track: TRACK, index: number) => (
          <div
            key={index}
            className="flex w-full min-h-[60px] items-center"
            onClick={() => {
              setPlayTime(0);
              setCurrentTrack(track);
            }}
          >
            <div className="relative h-full aspect-square rounded-full overflow-hidden mr-2">
              <Image
                priority
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
      </section>
    </div>
  );
};

export default PlayerDesktopView;
