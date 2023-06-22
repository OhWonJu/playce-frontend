import React, { useMemo, useRef } from "react";

import Sheet, { SheetRef } from "@components/ui/BottomSheet";
import useTheme from "@lib/client/hooks/useTheme";
import { NAV_HEIGHT } from "constants/constants";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { TRACK } from "@lib/client/store/types/playerControlType";
import Image from "next/image";

const BottomSheet: React.FC<{}> = ({}) => {
  const theme = useTheme();

  const { playList } = usePlayerControl();

  const ref = useRef<SheetRef>();

  const snapTo = (i: number) => ref.current?.snapTo(i);

  const [mountPoint, rootElement] = useMemo(
    () => [
      document.getElementById("player-footer"),
      document.getElementById("player-container"),
    ],
    [document.getElementById("player-container")],
  );

  console.log("asdas");

  return (
    <>
      {rootElement ? (
        <Sheet
          ref={ref}
          rootId="player-footer"
          mountPoint={mountPoint}
          rootHeight={rootElement?.offsetHeight}
          isMain={false}
          isOpen={true}
          modalMode={false}
          onClose={() => snapTo(1)}
          initialSnap={1}
          useSnapPoint={true}
          snapPoints={[1, NAV_HEIGHT + 40]} // sheet content + sheet header's heigth
          onSnap={snapIndex =>
            console.log("> Current snap point index:", snapIndex)
          }
          // detent="content-height"
        >
          <Sheet.Container
            isMain={false}
            style={{ height: "100%", maxHeight: "100%" }}
            className="rounded-2xl shadow-top"
          >
            <Sheet.Header isMain={false} />
            <Sheet.Content isMain={false} disableDrag={true}>
              <div
                className="fixed w-full h-10 bg-red-50"
                style={{
                  // backgroundColor: theme.background_color
                  height: NAV_HEIGHT,
                }}
              >
                tabs
              </div>
              <div
                className="flex flex-col w-full overflow-y-scroll scrollbar-hide z-[100]"
                style={{
                  backgroundColor: theme.background_color,
                  marginTop: NAV_HEIGHT,
                }}
              >
                <div className="flex flex-col w-full py-2 px-4 space-y-3">
                  {playList.map((list: TRACK, index: number) => (
                    <div
                      key={index}
                      className="flex w-full h-[60px] items-center"
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
              </div>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      ) : null}
    </>
  );
};

export default BottomSheet;
