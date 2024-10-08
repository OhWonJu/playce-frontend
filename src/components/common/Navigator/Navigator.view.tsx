import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useMotionValue } from "framer-motion";

import useTheme from "@lib/client/hooks/useTheme";
import { useUI } from "@components/ui";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import {
  Explore,
  ExploreFill,
  Home,
  HomeFill,
  Search,
} from "@components/icons";
import { DEFAULT_TWEEN_CONFIG } from "@components/ui/BottomSheet/constants";
import { NAVIGATION, NAV_HEIGHT } from "@lib/client/constants/uiStandard";

import { PlayIndicator } from "./modules";
import SubSheetProgressStore from "@lib/client/store/simpleStore/subSheetProgress";

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
  const { progress: subProgress } = SubSheetProgressStore();
  const y = useMotionValue(0);

  useEffect(() => {
    if (viewMode === "DESKTOP") return;

    if (subProgress > 0) {
      y.get() < NAV_HEIGHT && y.set(NAV_HEIGHT);
      return;
    }

    if (progress <= 0) {
      animate(y, 0, { type: "tween", ...DEFAULT_TWEEN_CONFIG } as {
        type: "tween";
      });
    } else {
      animate(y, (progress / 100) * NAV_HEIGHT, {
        type: "tween",
        ...DEFAULT_TWEEN_CONFIG,
      } as { type: "tween" });
    }
  }, [progress]);

  if (viewMode === "INIT") return null;
  else if (viewMode === "DESKTOP")
    return (
      <div
        className="fixed top-0 w-full"
        style={{
          height: NAV_HEIGHT,
          backgroundColor: theme.background_color,
          zIndex: NAVIGATION,
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
          <Profile />
        </div>
      </div>
    );
  else
    return (
      <motion.div
        className="fixed flex flex-col justify-around bottom-0 w-full"
        style={{
          height: NAV_HEIGHT,
          y,
          backgroundColor: theme.background_color,
          zIndex: NAVIGATION,
        }}
        initial={progress <= 0 ? { y: 0 } : false}
      >
        {displayPlayer && progress < 1 ? <PlayIndicator /> : null}
        <div className="flex justify-around items-center px-4 py-2 w-full h-full">
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
          <Profile />
        </div>
      </motion.div>
    );
};

const Profile = () => (
  <div className="relative w-7 h-7 rounded-full overflow-hidden">
    <Image
      // priority={true}
      src={"/onneul.jpeg"}
      alt="profile"
      fill={true}
      sizes="100%"
      style={{ objectFit: "cover" }}
      draggable={false}
    />
  </div>
);

export default NavigatorView;
