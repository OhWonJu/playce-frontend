import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { animate, useMotionValue, useTransform } from "framer-motion";

import Sheet, { SheetRef } from "@components/ui/BottomSheet";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

import {
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

interface PlayerViewProps {}

const PlayerView: React.FC<PlayerViewProps> = ({}) => {
  const { viewMode } = useUI();
  const { height } = useWindowSize();
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
        id="player"
        rootId="root-layout"
        isMain={true}
        isOpen={true}
        modalMode={false}
        // onClose={() => setOpen(false)}
        onClose={() => console.log("CLOSE")}
        fixedHeight={
          viewMode !== "DESKTOP"
            ? NAV_HEIGHT + PLAYER_HEADER_HEIGHT
            : PLAYER_HEADER_HEIGHT + 34
        }
        useSnapPoint={false}
        snapPoints={[
          viewMode !== "DESKTOP" ? 1 : height - NAV_HEIGHT,
          viewMode !== "DESKTOP"
            ? NAV_HEIGHT + PLAYER_HEADER_HEIGHT
            : PLAYER_HEADER_HEIGHT,
        ]}
        // onSnap={snapIndex =>
        //   console.log("> Current snap point index:", snapIndex)
        // }
        style={{ zIndex: 40 }}
      >
        <Sheet.Container isMain={true}>
          <Sheet.Content isMain={true} style={{ minHeight: "80%" }}>
            <div
              id="player-container"
              className="flex flex-col w-full h-[100%] max-h-screen"
            >
              {/* HEADER */}
              <PlayerHeader
                style={{
                  height: headerHeight,
                  opacity: headerOpacity,
                  marginBottom: gap,
                }}
              >
                <div className="flex justify-center items-center h-full aspect-square rounded-full">
                  <DotMenu className="w-5 h-5" />
                </div>
              </PlayerHeader>

              {/* BODY */}
              <PlayerBody id="player-body">
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
                    <div className="__MICRO_TRACK__ flex flex-col max-w-[80%]">
                      <a className="__MICRO_TRACK_TITLE__ font-extrabold text-sm">
                        {currentTrack?.trackTitle}
                      </a>
                      <a className="__MICRO_ARTIST__ font-semibold text-xs">
                        {currentTrack?.artistEn}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <PlayButton className={"w-5 h-5"} />
                      <ForwardButton isForward={true} />
                    </div>
                  </PlayerMicroCtlr>
                </AlbumArea>
                <PlayerCtlrArea
                  id="player-controll"
                  style={{
                    opacity: headerOpacity,
                    paddingTop: gap,
                    paddingBottom: gap,
                  }}
                >
                  {/* TRACK INFO */}
                  <section className="__TRACK_INFO__ flex flex-col items-center mb-2">
                    <div className="__TRACK_TITLE__ font-extrabold text-3xl">
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
                </PlayerCtlrArea>
              </PlayerBody>
            </div>
          </Sheet.Content>

          {/* Footer */}
          <Sheet.Content
            isMain={true}
            disableDrag={true}
            style={{ minHeight: "20%" }}
          >
            <PlayerFooter id="player-footer" className="h-full">
              <BottomSheet />
            </PlayerFooter>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default PlayerView;
