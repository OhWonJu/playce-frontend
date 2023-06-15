import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { animate, useMotionValue, useTransform } from "framer-motion";

import Sheet, { SheetRef } from "@components/ui/BottomSheet";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

import {
  DESKTOP_PLAYER_WIDTH,
  NAV_HEIGHT,
  PLAYER_HEADER_HEIGHT,
  WAVE_FORM_HEIGHT,
} from "constants/constants";

import {
  AlbumArt,
  BottomSheet,
  ForwardButton,
  PlayButton,
  PlayTimer,
  RepeatButton,
  ShuffleButton,
} from "./modules";
import {
  Album,
  AlbumArea,
  PlayerBody,
  PlayerCtlrArea,
  PlayerFooter,
  PlayerHeader,
  PlayerMicroCtlr,
} from "./Player.styles";
import { DotMenu } from "@components/icons";
import { useUI } from "@components/ui";
import { useWindowSize } from "react-use";

const DynamicWaveform = dynamic(() => import("./modules/Waveform"), {
  ssr: false,
});

interface PlayerDesktopViewProps {}

const PlayerDesktopView: React.FC<PlayerDesktopViewProps> = ({}) => {
  const { play, currentTrack } = usePlayerControl();
  // console.log("Wats going on: ", play);

  // const snapTo = (i: number) => ref.current?.snapTo(i);

  return (
    <div
      className="absolute top-0 right-0 flex flex-col h-screen bg-yellow-100"
      style={{
        width: DESKTOP_PLAYER_WIDTH,
        minHeight: 667,
        marginTop: NAV_HEIGHT,
        zIndex: 60,
      }}
    ></div>
  );
};

export default PlayerDesktopView;
