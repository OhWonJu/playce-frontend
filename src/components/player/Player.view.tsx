import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import { animate, useMotionValue, useTransform, motion } from "framer-motion";

import { useUI } from "@components/ui";
import {
  NAV_HEIGHT,
  PLAYER_HEADER_HEIGHT,
  WAVE_FORM_HEIGHT,
} from "constants/constants";
import Sheet, { SheetRef } from "@components/ui/BottomSheet";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";
import {
  Album,
  AlbumArea,
  PlayerBody,
  PlayerCtlrArea,
  PlayerFooter,
  PlayerHeader,
  PlayerMicroCtlr,
} from "./Player.styles";
import Image from "next/image";
import { artist } from "mock/adoy";
import { Forward, Play, Repeat, Shuffle } from "@components/icons";

const DynamicWaveform = dynamic(() => import("./modules/Waveform"), {
  ssr: false,
});

interface PlayerViewProps {
  isOpen?: boolean;
  setOpen?: any;
}

const PlayerView: React.FC<PlayerViewProps> = ({ isOpen, setOpen }) => {
  const { viewMode } = useUI();

  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

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
  const headerHeight = useTransform(motionProg, [10, 70], ["0%", "12%"]);

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
        onSnap={snapIndex =>
          console.log("> Current snap point index:", snapIndex)
        }
        style={{ zIndex: 40 }}
      >
        <Sheet.Container isMain={true}>
          <Sheet.Content isMain={true}>
            <div className="flex flex-col w-full h-full">
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
                    <motion.div
                      className="relative w-full aspect-square rounded-full overflow-hidden flex items-center justify-center"
                      animate={{ rotate: "1turn" }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Image
                        priority
                        src={artist.ADOY.ablums[0].art}
                        alt="product image"
                        layout="fill"
                        // fill={true}
                        sizes="100%"
                        // style={{ objectFit: "cover" }}
                        draggable={false}
                      />
                      <motion.div
                        className="_PIN_WRAPPER_relative w-[14%] flex items-center justify-center"
                        style={{ opacity: pinOpacity }}
                      >
                        <Pin />
                      </motion.div>
                    </motion.div>
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
                  <div className="flex flex-col items-center mb-3">
                    <div className="font-extrabold text-3xl">
                      {artist.ADOY.ablums[0].tracks[1].title}
                    </div>
                    <div className="font-bold text-base">
                      {artist.ADOY.nameEn}
                    </div>
                  </div>
                  {/* wave form  */}
                  <div
                    className="relative mb-8 w-full overflow-hidden"
                    style={{ height: WAVE_FORM_HEIGHT }}
                  >
                    <div className="absolute w-full h-full bottom-[15.5px]">
                      <DynamicWaveform />
                    </div>
                  </div>
                  <div className="flex w-full justify-between items-center ">
                    <div>
                      <Shuffle />
                    </div>
                    <div className="border-black border-opacity-5 shadow-md border-[0.2px] w-12 h-12 rounded-full flex justify-center items-center">
                      <Forward className="rotate-180" />
                    </div>
                    <div className="border-black border-opacity-5 shadow-md border-[0.2px] w-16 h-16 rounded-full flex justify-center items-center">
                      <Play width="30" height="30" />
                    </div>
                    <div className="border-black border-opacity-5 shadow-md border-[0.2px] w-12 h-12 rounded-full flex justify-center items-center">
                      <Forward />
                    </div>
                    <div>
                      <Repeat />
                    </div>
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

const Pin = () => {
  return (
    <>
      {/* <div className="absolute inset-x-0  w-full h-full rounded-full z-10" />
      <div className="absolute inset-x-0 bg-white opacity-70 w-full h-full rounded-full" />
      <div className="w-[2.45rem] h-[2.45rem] bg-white rounded-full z-20 flex justify-center items-center">
        <div className="relative w-8 h-8 bg-zinc-700 rounded-full">
          <div className="absolute inset-x-0 w-full h-full">
            <div className="absolute w-[9px] h-[3px] bg-zinc-400 bottom-0 mb-[3px] left-1/2 -ml-[4.5px] rotate-[90deg]" />
          </div>
          <div className="absolute inset-x-0 w-full h-full rotate-[120deg]">
            <div className="absolute w-[9px] h-[3px] bg-zinc-400 bottom-0 mb-[3px] left-1/2 -ml-[4.5px] rotate-[90deg]" />
          </div>
          <div className="absolute inset-x-0 w-full h-full rotate-[240deg]">
            <div className="absolute w-[9px] h-[3px] bg-zinc-400 bottom-0 mb-[3px] left-1/2 -ml-[4.5px] rotate-[90deg]" />
          </div>
        </div>
      </div> */}
      <div className="grid place-items-center w-full aspect-square rounded-full bg-white bg-opacity-50 z-10">
        <div className="grid place-items-center w-[85%] aspect-square rounded-full bg-white">
          <div className="relative w-[85%] aspect-square bg-zinc-700 rounded-full">
            <div className="absolute grid place-items-center inset-x-0 w-full h-full">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
            <div className="absolute grid place-items-center inset-x-0 w-full h-full rotate-[120deg]">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
            <div className="absolute grid place-items-center inset-x-0 w-full h-full rotate-[240deg]">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
