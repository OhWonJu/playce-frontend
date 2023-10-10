import React, { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, motion, useTransform } from "framer-motion";

import { NAV_HEIGHT } from "constants/constants";

import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import SubSheetProgressStore from "@lib/client/store/simpleStore/subSheetProgress";

import Sheet, { SheetRef } from "@components/ui/BottomSheet";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";

import {
  PBSContentWrapper,
  PBSHandle,
  PBSHandleWrapper,
  PBSHeaderWrapper,
} from "./PlayerBottomSheet.styles";
import { Content, Lyrics, TrackList } from "./modules";
import { Tab, TabSection } from "@components/ui/Tab";

const tabs = ["Tracks", "Lyrics", "Content"];

const PlayerBottomSheetView = () => {
  const [focusedTab, setFocusedTab] = useState(-1);
  const prevFocusedTab = useRef(focusedTab);

  const tabViews = [<TrackList />, <Lyrics />, <Content />];

  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  const { progress } = SubSheetProgressStore();
  const { progress: mainProgress } = MainSheetProgressStore();
  const motionProg = useMotionValue(0);
  const mainMotionProg = useMotionValue(0);

  useEffect(() => {
    if (mainProgress <= 0) {
      // 메인시트가 close 되는 경우
      animate(mainMotionProg, 0, {
        type: "spring",
        ...DEFAULT_SPRING_CONFIG,
      });
    } else {
      // 메인 플레이어가 열리는 경우
      animate(mainMotionProg, mainProgress, {
        type: "spring",
        ...DEFAULT_SPRING_CONFIG,
      });
    }
  }, [mainProgress]);

  useEffect(() => {
    if (progress <= 0) {
      // 바텀시트가 close 되는 경우
      animate(motionProg, 0, {
        type: "spring",
        ...DEFAULT_SPRING_CONFIG,
      });
    } else {
      // 바텀시트가 열리는 경우
      animate(motionProg, progress, {
        type: "spring",
        ...DEFAULT_SPRING_CONFIG,
      });
      // 탭을 기본탭으로 이동시킨다.
      if (focusedTab === -1) setFocusedTab(0);
    }
    // 플레이어가 full screen이 되면 -> 플레이어 바텀 시트의 탭 초기화
    if (mainProgress > 99) setFocusedTab(-1);
  }, [progress]);


  // 버벅거리는 이유이자 원흉
  // 플레이어 팝업 여부에 따라 바텀탭이 나오거나 들어가는 로직 떄문에 쓰는 로직임
  // mainProgress, subProgress 로 대체할 수 있는 방법은..?
  const y =
    progress <= 0
      ? useTransform(mainMotionProg, [85, 100], [NAV_HEIGHT + 20, 0])
      : useTransform(motionProg, [50, 100], [0, NAV_HEIGHT + 20]);

  const trigger = useTransform(motionProg, [0, 100], [0, 1]); // 0: to OPEN | 1: to CLOSE

  const tabClickHandler = (index: number) => {
    // 탭 클릭시 바텀시트 완전 오픈
    if (trigger.get() === 0) {
      // triggerHandler();
      snapTo(0);
    }
    prevFocusedTab.current = focusedTab;
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
        // initialSnap={1}
        snapPoints={[1, NAV_HEIGHT + 20]} // sheet content + sheet header's heigth
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
                onClick={() => snapTo(0)}
              >
                <PBSHandle />
              </PBSHandleWrapper>
              <PBSHeaderWrapper>
                <Tab
                  focusedTab={focusedTab}
                  tabClickHandler={tabClickHandler}
                  tabContents={tabs}
                />
              </PBSHeaderWrapper>
            </Sheet.Header>
            <Sheet.Content isMain={false} disableDrag={true}>
              <PBSContentWrapper>
                <TabSection
                  focusedTab={focusedTab}
                  prevFocusedTab={prevFocusedTab.current}
                  tabViews={tabViews}
                />
              </PBSContentWrapper>
            </Sheet.Content>
          </Sheet.Container>
        </motion.div>
      </Sheet>
    </>
  );
};

export default PlayerBottomSheetView;
