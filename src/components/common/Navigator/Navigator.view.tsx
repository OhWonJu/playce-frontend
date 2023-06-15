import React, { useEffect } from "react";
import { animate, motion, useMotionValue } from "framer-motion";

import { useUI } from "@components/ui";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";

import { NAV_HEIGHT } from "constants/constants";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";

interface NavigatorViewProps {
  logoVisible: boolean;
}

const NavigatorView: React.FC<NavigatorViewProps> = ({ logoVisible }) => {
  const { viewMode } = useUI();
  const { progress } = MainSheetProgressStore();

  const y = useMotionValue(0);

  useEffect(() => {
    if (progress <= 0) {
      animate(y, 0, { type: "spring", ...DEFAULT_SPRING_CONFIG });
    } else {
      animate(y, (progress / 100) * NAV_HEIGHT, {
        type: "spring",
        ...DEFAULT_SPRING_CONFIG,
      });
    }
  }, [progress]);

  if (viewMode === "INIT") return null;

  return (
    <>
      {viewMode !== "DESKTOP" ? (
        <motion.div
          className="fixed bottom-0 bg-yellow-300 w-full z-50"
          style={{ height: NAV_HEIGHT, y }}
        >
          Mobile NAV
        </motion.div>
      ) : (
        <div
          className="fixed top-0 bg-yellow-300 w-full z-50"
          style={{ height: NAV_HEIGHT }}
        >
          COMMON NAV
        </div>
      )}
    </>
  );
};

export default NavigatorView;
