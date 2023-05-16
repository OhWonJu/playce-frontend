import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

import { useUI } from "@components/ui";
import { NAV_HEIGHT, PLAYER_HEADER_HEIGHT } from "constants/constants";
import Sheet, { SheetRef } from "@components/ui/BottomSheet";
import { useSheetContext } from "@components/ui/BottomSheet/context";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";
import Image from "next/image";
import { Forward, Pause, Play, Repeat, Shuffle } from "@components/icons";
import { artist } from "mock/adoy";

const PlayerView = () => {
  const { viewMode } = useUI();

  const [isOpen, setOpen] = useState(true);
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

  const headerOpacity = useTransform(motionProg, [85, 100], [0, 1]);
  const headerHeight = useTransform(
    motionProg,
    [10, 70],
    [0, PLAYER_HEADER_HEIGHT],
  );

  const albumWidth = useTransform(
    motionProg,
    [0, 100],
    [PLAYER_HEADER_HEIGHT, 100],
  );
  const albumXPadding = useTransform(motionProg, [0, 100], ["0.25rem", "2rem"]);
  const albumYPadding = useTransform(motionProg, [0, 100], ["0.25rem", "1rem"]);

  const microCtrlOpacity = useTransform(motionProg, [0, 30], [1, 0]);

  const controllerHeight = useTransform(motionProg, [10, 70], ["0%", "30%"]);

  const pinOpacity = useTransform(motionProg, [99, 100], [0, 1]);

  return (
    <>
      <Sheet
        ref={ref}
        rootId="root-layout"
        isMain={true}
        isOpen={isOpen}
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
          {/* <Sheet.Header isMain={true} /> */}
          <Sheet.Content isMain={true}>
            <div className="w-full h-full flex flex-col">
              {/* HEADER */}
              <motion.div
                className="header w-full flex justify-center items-center"
                style={{ height: headerHeight, opacity: headerOpacity }}
              >
                HEADER
              </motion.div>
              {/* BOODY */}
              <motion.div
                className="body w-full flex flex-col items-center "
                style={{ height: `calc(100% - ${PLAYER_HEADER_HEIGHT}px)` }}
              >
                <div className="flex w-full overflow-hidden">
                  <motion.div
                    className="aspect-square max-w-full"
                    style={{
                      width: albumWidth,
                      minWidth: `${progress}%`,
                      paddingLeft: albumXPadding,
                      paddingRight: albumXPadding,
                      paddingTop: albumYPadding,
                      paddingBottom: albumYPadding,
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
                        src={"/adoy_wonder.webp"}
                        alt="product image"
                        layout="fill"
                        // fill={true}
                        sizes="100%"
                        style={{ objectFit: "cover" }}
                        draggable={false}
                      />
                      <motion.div
                        className="relative w-11 h-11 flex items-center justify-center rounded-full"
                        style={{ opacity: pinOpacity }}
                      >
                        <div className="absolute inset-x-0  w-full h-full rounded-full z-10" />
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
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="flex-1"
                    style={{
                      opacity: microCtrlOpacity,
                      height: PLAYER_HEADER_HEIGHT,
                    }}
                  >
                    <div>micro controller</div>
                  </motion.div>
                </div>
                <motion.div
                  className="flex flex-col w-full items-center px-8"
                  style={{ opacity: headerOpacity, height: controllerHeight }}
                >
                  <div className="flex flex-col items-center mb-5">
                    <div className="font-extrabold text-3xl">
                      {artist.ADOY.ablums[0].tracks[0].title}
                    </div>
                    <div className="font-bold text-base">
                      {artist.ADOY.nameEn}
                    </div>
                  </div>
                  <div className="mb-8">play bar</div>
                  <div className="flex w-full justify-between items-center ">
                    <div>
                      <Shuffle />
                    </div>
                    <div className="border-black border-opacity-5 shadow-md border-[0.2px] w-12 h-12 rounded-full flex justify-center items-center">
                      <Forward className="rotate-180" />
                    </div>
                    <div className="border-black border-opacity-5 shadow-md border-[0.2px] w-16 h-16 rounded-full flex justify-center items-center">
                      <Play width="30" height="30" />
                      {/* <Pause /> */}
                    </div>
                    <div className="border-black border-opacity-5 shadow-md border-[0.2px] w-12 h-12 rounded-full flex justify-center items-center">
                      <Forward />
                    </div>
                    <div>
                      <Repeat />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default PlayerView;
