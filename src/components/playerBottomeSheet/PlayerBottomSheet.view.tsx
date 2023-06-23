import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, useMotionValue, motion, useTransform } from "framer-motion";

import { NAV_HEIGHT } from "constants/constants";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import { TRACK } from "@lib/client/store/types/playerControlType";

import Sheet, { SheetRef } from "@components/ui/BottomSheet";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";

import {
  PBSContentWrapper,
  PBSHandle,
  PBSHandleWrapper,
  PBSHeader,
  PBSHeaderA,
  PBSHeaderTabs,
  PBSHeaderWrapper,
} from "./PlayerBottomSheet.styles";

const PlayerBottomSheetView = () => {
  const { playList } = usePlayerControl();

  const ref = useRef<SheetRef>();

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
        onClose={() => null}
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
              <PBSHandleWrapper
                className="relative grid place-items-center"
                style={{ width: "100%", height: 20 }}
              >
                <PBSHandle />
              </PBSHandleWrapper>
              <PBSHeaderWrapper>
                <PBSHeader>
                  {["Tracks", "Lyrics", "Content"].map(a => (
                    <PBSHeaderTabs>
                      <PBSHeaderA>{a}</PBSHeaderA>
                    </PBSHeaderTabs>
                  ))}
                </PBSHeader>
              </PBSHeaderWrapper>
            </Sheet.Header>
            <Sheet.Content isMain={false} disableDrag={true}>
              <PBSContentWrapper>
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
              </PBSContentWrapper>
            </Sheet.Content>
          </Sheet.Container>
        </motion.div>
      </Sheet>
    </>
  );
};

export default PlayerBottomSheetView;
