import React, { useMemo, useRef } from "react";

import Sheet, { SheetRef } from "@components/ui/BottomSheet";
import useTheme from "@lib/client/hooks/useTheme";
import { NAV_HEIGHT } from "constants/constants";

const BottomSheet: React.FC<{}> = ({}) => {
  const theme = useTheme();

  const ref = useRef<SheetRef>();

  const snapTo = (i: number) => ref.current?.snapTo(i);

  const [mountPoint, rootElement] = useMemo(
    () => [
      document.getElementById("player-footer"),
      document.getElementById("player-container"),
    ],
    [document.getElementById("player-container")],
  );

  return (
    <>
      {rootElement ? (
        <Sheet
          ref={ref}
          rootId="player-container"
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
            <Sheet.Header />
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
                <div className="flex flex-col w-full h-[1000px]">foooooter</div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      ) : null}
    </>
  );
};

export default BottomSheet;
