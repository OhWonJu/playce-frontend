import React from "react";
import cn from "clsx";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

import { Pause, Play } from "@components/icons";
import RippleButton from "@components/ui/RippleButton/RippleButton";
import useTheme from "@lib/client/hooks/useTheme";

const PlayButton: React.FC<{ className?: string }> = ({ className }) => {
  const theme = useTheme();
  const { setPlay, play } = usePlayerControl();

  const rootClassName = cn(
    "w-16 h-16 rounded-full flex justify-center items-center",
    {},
    className,
  );

  return (
    // <div
    //   className={rootClassName}
    //   onClick={() => {
    //     setPlay(!play);
    //   }}
    // >
    //   {play === true ? (
    //     <Pause width="30" height="30" />
    //   ) : (
    //     <Play width="30" height="30" />
    //   )}
    // </div>
    <RippleButton className={rootClassName} clickHandler={() => setPlay(!play)}>
      {play === true ? (
        <Pause width="30" height="30" fill={theme.theme_comparsion_color} />
      ) : (
        <Play width="30" height="30" fill={theme.theme_comparsion_color} />
      )}
    </RippleButton>
  );
};

export default PlayButton;
