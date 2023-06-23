import { useUI } from "@components/ui";
import Sheet, { SheetRef } from "@components/ui/BottomSheet";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import useTheme from "@lib/client/hooks/useTheme";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import { TRACK } from "@lib/client/store/types/playerControlType";
import { NAV_HEIGHT } from "constants/constants";
import { animate, useMotionValue, motion, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const PlayerBottomSheetView = () => {
  const theme = useTheme();

  const { playList } = usePlayerControl();

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

  const y = useTransform(motionProg, [85, 100], [NAV_HEIGHT + 20, 0]);

  return (
    <>
      <Sheet
        ref={ref}
        id="player-bottom-sheet"
        rootId="root-layout"
        mountPoint={document.getElementById("root-layoout")}
        isMain={false}
        isOpen={true}
        modalMode={false}
        // onClose={() => snapTo(1)}
        fixedHeight={NAV_HEIGHT + 20}  
        // initialSnap={1}
        // useSnapPoint={true}
        // snapPoints={[1, NAV_HEIGHT + 20]} // sheet content + sheet header's heigth
        onSnap={snapIndex =>
          console.log("> Current snap point index:", snapIndex)
        }
      >
        <motion.div
          id="player-bottom-sheet"
          style={{
            height: "100%",
            maxHeight: "100%",
            y,
          }}
        >
          <Sheet.Container
            isMain={false}
            style={{ height: "100%", maxHeight: "100%" }}
            className="rounded-2xl shadow-top"
          >
            <Sheet.Header
              isMain={false}
              style={{ width: "100%", height: NAV_HEIGHT + 20 }}
            >
              <div
                className="relative grid place-items-center"
                style={{ width: "100%", height: 20 }}
              >
                <div
                  style={{
                    width: 32,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: "#D0D0D0",
                  }}
                />
              </div>
              <div
                className="fixed flex justify-between items-center w-full"
                style={{
                  // backgroundColor: theme.background_color
                  height: NAV_HEIGHT,
                }}
              >
                <div className="grid place-items-center w-[25%] h-full mx-4">
                  <a className="text-sm font-bold">Tracks</a>
                </div>
                <div className="grid place-items-center w-[25%] h-full mx-4">
                  <a className="text-sm font-bold">Lyrics</a>
                </div>
                <div className="grid place-items-center w-[25%] h-full mx-4">
                  <a className="text-sm font-bold">Content</a>
                </div>
              </div>
            </Sheet.Header>
            <Sheet.Content isMain={false} disableDrag={true}>
              <div
                className="flex flex-col w-full h-[87%] pt-2 pb-4 px-4 space-y-3 overflow-y-scroll scrollbar-hide z-[100]"
                style={{
                  backgroundColor: theme.background_color,
                  // marginTop: NAV_HEIGHT,
                }}
              >
                {playList.map((list: TRACK, index: number) => (
                  <div
                    key={index}
                    className="flex w-full min-h-[60px] items-center"
                  >
                    <div className="relative h-full aspect-square rounded-full overflow-hidden mr-2">
                      <Image
                        priority
                        src={list.ablumArtURL}
                        alt="product image"
                        layout="fill"
                        sizes="100%"
                        draggable={false}
                      />
                    </div>
                    <div className="flex flex-col">
                      <a className="font-semibold text-base">
                        {list.trackTitle}
                      </a>
                      <a className="font-medium text-xs">{list.artistKo}</a>
                    </div>
                  </div>
                ))}
              </div>
            </Sheet.Content>
          </Sheet.Container>
        </motion.div>
      </Sheet>
    </>
  );
};

export default PlayerBottomSheetView;
