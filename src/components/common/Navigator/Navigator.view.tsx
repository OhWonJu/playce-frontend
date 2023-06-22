import React, { useEffect } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue } from "framer-motion";

import useTheme from "@lib/client/hooks/useTheme";
import { useUI } from "@components/ui";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import { Explor, Home, Search } from "@components/icons";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";

import { NAV_HEIGHT } from "constants/constants";

interface NavigatorViewProps {
  logoVisible: boolean;
}

const NavigatorView: React.FC<NavigatorViewProps> = ({ logoVisible }) => {
  const theme = useTheme();
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
          className="fixed flex justify-around bottom-0 px-4 py-2 w-full z-50"
          style={{
            height: NAV_HEIGHT,
            y,
            backgroundColor: theme.background_color,
          }}
        >
          <Home className="w-7 h-7" />
          <Explor className="w-7 h-7" />
          <Search className="w-7 h-7" />
          <div className="relative w-7 h-7 rounded-full overflow-hidden">
            <Image
              priority
              src={"/onneul.jpeg"}
              alt="product image"
              layout="fill"
              sizes="100%"
              draggable={false}
            />
          </div>
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