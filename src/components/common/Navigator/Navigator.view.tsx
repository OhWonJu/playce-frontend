import React, { useEffect, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue } from "framer-motion";
import { throttle } from "lodash";

import useTheme from "@lib/client/hooks/useTheme";
import { Link, useUI } from "@components/ui";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import {
  Explore,
  ExploreFill,
  Home,
  HomeFill,
  Search,
} from "@components/icons";
import { DEFAULT_SPRING_CONFIG } from "@components/ui/BottomSheet/constants";

import { NAV_HEIGHT } from "constants/constants";
import { PlayIndicator } from "./modules";

interface NavigatorViewProps {
  logoVisible: boolean;
  pathName?: string;
}

const NavigatorView: React.FC<NavigatorViewProps> = ({
  logoVisible,
  pathName,
}) => {
  const theme = useTheme();
  const { viewMode, displayPlayer, openDropDown, setDropDownView } = useUI();
  const { progress } = MainSheetProgressStore();
  const y = useMotionValue(0);

  useEffect(() => {
    if (viewMode === "DESKTOP") return;

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

  const PROFILE = () => (
    <div className="relative w-7 h-7 rounded-full overflow-hidden">
      <Image
        priority={true}
        src={"/onneul.jpeg"}
        alt="profile image"
        layout="fill"
        sizes="100%"
        draggable={false}
      />
    </div>
  );

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
            <Link href={"/home"}>
              {pathName === "home" ? (
                <HomeFill
                  className="w-7 h-7"
                  fill={theme.theme_comparsion_color}
                />
              ) : (
                <Home className="w-7 h-7" />
              )}
            </Link>
            <Link href={"/explore"}>
              {pathName === "explore" ? (
                <ExploreFill
                  className="w-7 h-7"
                  fill={theme.theme_comparsion_color}
                />
              ) : (
                <Explore className="w-7 h-7" />
              )}
            </Link>
            <button
              onClick={() => {
                setDropDownView("SEARCH_VIEW");
                openDropDown();
              }}
            >
              <Search className="w-7 h-7" />
            </button>
            <PROFILE />
          </div>
        </motion.div>
      ) : (
        <div
          className="fixed top-0 w-full z-50"
          style={{
            height: NAV_HEIGHT,
            backgroundColor: theme.background_color,
          }}
        >
          <div className="relative flex justify-center w-full h-full">
            <div className="w-[35%] min-w-[550px] h-full flex justify-around items-center px-4 py-2">
              <Link href={"/home"}>
                {pathName === "home" ? (
                  <HomeFill
                    className="w-7 h-7"
                    fill={theme.theme_comparsion_color}
                  />
                ) : (
                  <Home className="w-7 h-7" />
                )}
              </Link>
              <Link href={"/explore"}>
                {pathName === "explore" ? (
                  <ExploreFill
                    className="w-7 h-7"
                    fill={theme.theme_comparsion_color}
                  />
                ) : (
                  <Explore className="w-7 h-7" />
                )}
              </Link>
              <button
                onClick={() => {
                  setDropDownView("SEARCH_VIEW");
                  openDropDown();
                }}
              >
                <Search className="w-7 h-7" />
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full grid place-items-center px-[1.5rem]">
            <PROFILE />
          </div>
        </div>
      )}
    </>
  );
};

export default NavigatorView;
