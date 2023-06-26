import React, { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, motion, useTransform } from "framer-motion";

import { NAV_HEIGHT } from "constants/constants";

import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";

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
import { Content, Lyrics, TrackList } from "./modules";

const PlayerBottomSheetView = () => {
  const [focusedTab, setFocusedTab] = useState(-1);
  const tabView = [<TrackList />, <Lyrics />, <Content />];

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

      if (focusedTab === -1) setFocusedTab(0);
    } else {
      animate(motionProg, progress, {
        type: "spring",
        ...DEFAULT_SPRING_CONFIG,
      });

      setFocusedTab(-1);
    }
  }, [progress]);

  const y = useTransform(motionProg, [85, 100], [NAV_HEIGHT + 20, 0]);
  const trigger = useTransform(motionProg, [0, 100], [1, 0]); // 0: to OPEN | 1: to CLOSE

  const triggerHandler = () => {
    const nowTrigger = trigger.get();
    if (nowTrigger === 0 || nowTrigger === 1) {
      snapTo(nowTrigger);
      trigger.set(Math.abs(nowTrigger - 1));
    }
  };

  const tabClickHandler = (index: number) => {
    if (trigger.get() === 0) {
      triggerHandler();
    }
    setFocusedTab(index);
  };

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
        initialSnap={1}
        // useSnapPoint={true}
        snapPoints={[1, NAV_HEIGHT + 20]} // sheet content + sheet header's heigth
        // onSnap={snapIndex =>
        //   console.log("> Current snap point index:", snapIndex)
        // }
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
                onClick={() => triggerHandler()}
              >
                <PBSHandle />
              </PBSHandleWrapper>
              <PBSHeaderWrapper>
                <PBSHeader>
                  {["Tracks", "Lyrics", "Content"].map((a, index) => (
                    <PBSHeaderTabs
                      key={index}
                      onClick={() => tabClickHandler(index)}
                    >
                      <PBSHeaderA focused={focusedTab === index}>
                        {a}
                      </PBSHeaderA>
                    </PBSHeaderTabs>
                  ))}
                </PBSHeader>
              </PBSHeaderWrapper>
            </Sheet.Header>
            <Sheet.Content isMain={false} disableDrag={true}>
              <PBSContentWrapper>
                {focusedTab !== -1 ? tabView[focusedTab] : null}
              </PBSContentWrapper>
            </Sheet.Content>
          </Sheet.Container>
        </motion.div>
      </Sheet>
    </>
  );
};

export default PlayerBottomSheetView;
