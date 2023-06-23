import React, { useEffect } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue } from "framer-motion";

import useTheme from "@lib/client/hooks/useTheme";
import { useUI } from "@components/ui";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import { Explor, Home, Search } from "@components/icons";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";

import { NAV_HEIGHT } from "constants/constants";
import { PlayIndicator } from "./modules";

interface NavigatorViewProps {
  logoVisible: boolean;
}

const NavigatorView: React.FC<NavigatorViewProps> = ({ logoVisible }) => {
  const theme = useTheme();
  const { viewMode, displayPlayer } = useUI();
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
          className="fixed flex flex-col justify-around bottom-0 w-full z-50"
          style={{
            height: NAV_HEIGHT,
            y,
            backgroundColor: theme.background_color,
          }}
        >
          {displayPlayer && progress < 1 ? <PlayIndicator /> : null}
          <div className="flex justify-around px-4 py-2 w-full h-full">
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
          </div>
        </motion.div>
      ) : (
        <div
          className="fixed top-0 w-full z-[100]"
          style={{
            height: NAV_HEIGHT,
            backgroundColor: theme.background_color,
          }}
        >
          <div className="flex justify-around px-4 py-2 w-full h-full">
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
          </div>
        </div>
      )}
    </>
  );
};

export default NavigatorView;
