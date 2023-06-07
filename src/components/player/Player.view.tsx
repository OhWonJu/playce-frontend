import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { animate, useMotionValue, useTransform } from "framer-motion";

import Sheet, { SheetRef } from "@components/ui/BottomSheet";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";
import { Forward } from "@components/icons";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

import {
  NAV_HEIGHT,
  PLAYER_HEADER_HEIGHT,
  WAVE_FORM_HEIGHT,
} from "constants/constants";

import {
  AlbumArt,
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

import { artist } from "mock/adoy";

const DynamicWaveform = dynamic(() => import("./modules/Waveform"), {
  ssr: false,
});

interface PlayerViewProps {
  isOpen?: boolean;
  setOpen?: any;
}

const PlayerView: React.FC<PlayerViewProps> = ({ isOpen, setOpen }) => {
  const { play, currentTrack } = usePlayerControl();
  // console.log("Wats going on: ", play);

  const ref = useRef<SheetRef>();
  // const snapTo = (i: number) => ref.current?.snapTo(i);

  const { progress } = MainSheetProgressStore();
  const motionProg = useMotionValue(0);

  useEffect(() => {
    if (progress <= 0) {
      animate(motionProg, 0, {
        type: "spring",
        ...DEFAULT_SPRING_CONFIG,
      });
    } else {
      animate(motionProg, progress, {
        type: "spring",
        ...DEFAULT_SPRING_CONFIG,
      });
    }
  }, [progress]);

  const gap = useTransform(motionProg, [0, 100], ["0rem", "1rem"]);

  const headerOpacity = useTransform(motionProg, [85, 100], [0, 1]);
  const headerHeight = useTransform(motionProg, [10, 70], ["0%", "10%"]);

  const albumHeight = useTransform(
    motionProg,
    [0, 100],
    [PLAYER_HEADER_HEIGHT, 100],
  );
  const albumPadding = useTransform(motionProg, [0, 100], ["0.4rem", "0rem"]);

  const microCtrlOpacity = useTransform(motionProg, [0, 30], [1, 0]);
  const microCtrlWidth = useTransform(motionProg, [0, 99], ["100%", "0%"]);

  const pinOpacity = useTransform(motionProg, [99, 100], [0, 1]);

  return (
    <>
      <Sheet
        ref={ref}
        rootId="root-layout"
        isMain={true}
        isOpen={true}
        modalMode={false}
        // onClose={() => setOpen(false)}
        onClose={() => console.log("CLOSE")}
        fixedHeight={NAV_HEIGHT + PLAYER_HEADER_HEIGHT}
        useSnapPoint={false}
        snapPoints={[1, NAV_HEIGHT + PLAYER_HEADER_HEIGHT]}
        // onSnap={snapIndex =>
        //   console.log("> Current snap point index:", snapIndex)
        // }
        style={{ zIndex: 40 }}
      >
        <Sheet.Container isMain={true}>
          <Sheet.Content isMain={true}>
            <div className="flex flex-col w-full h-full max-h-screen">
              {/* HEADER */}
              <PlayerHeader
                style={{
                  height: headerHeight,
                  opacity: headerOpacity,
                  marginBottom: gap,
                }}
              >
                Header
              </PlayerHeader>

              {/* BODY */}
              <PlayerBody>
                <AlbumArea>
                  <Album
                    className="aspect-square"
                    style={{
                      height: albumHeight,
                      minHeight: `${progress}%`,
                      padding: albumPadding,
                    }}
                  >
                    <AlbumArt
                      artURL={currentTrack?.ablumArtURL}
                      isPlay={play}
                      pinOpacity={pinOpacity}
                    />
                  </Album>
                  <PlayerMicroCtlr
                    style={{
                      opacity: microCtrlOpacity,
                      width: microCtrlWidth,
                    }}
                  >
                    <div>micro controller</div>
                  </PlayerMicroCtlr>
                </AlbumArea>
                <PlayerCtlrArea
                  style={{
                    opacity: headerOpacity,
                    paddingTop: gap,
                    paddingBottom: gap,
                  }}
                >
                  <div className="flex flex-col items-center mb-2">
                    <div className="__TRACK_TITLE__ font-extrabold text-3xl">
                      {currentTrack?.trackTitle}
                    </div>
                    <div className="__ARTIST__ font-bold text-base">
                      {currentTrack?.artistEn}
                    </div>
                  </div>
                  {/* wave form  */}
                  <div
                    className="relative mb-1 w-full overflow-hidden"
                    style={{ height: WAVE_FORM_HEIGHT }}
                  >
                    <div className="absolute w-full h-full bottom-[15.5px]">
                      <DynamicWaveform />
                    </div>
                  </div>
                  {/* 러닝 타임 훅 떄메 딴애들이 계속 돔...컴포넌트 분리하는게 나을듯.. */}
                  <div className="flex w-full justify-between font-semibold text-xs mb-7">
                    <PlayTimer />
                  </div>
                  <div className="flex w-full justify-between items-center ">
                    <ShuffleButton />
                    <div className="w-12 h-12 rounded-full flex justify-center items-center">
                      <Forward className="rotate-180" />
                    </div>
                    <PlayButton />
                    <div className="w-12 h-12 rounded-full flex justify-center items-center">
                      <Forward />
                    </div>
                    <RepeatButton />
                  </div>
                </PlayerCtlrArea>
              </PlayerBody>

              {/* Footer */}
              <PlayerFooter></PlayerFooter>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default PlayerView;
