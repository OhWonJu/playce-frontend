import React from "react";
import cn from "clsx";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

import { Pause, Play } from "@components/icons";
import RippleButton from "@components/ui/RippleButton/RippleButton";

const PlayButton: React.FC<{ className?: string }> = ({ className }) => {
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
        <Pause width="30" height="30" />
      ) : (
        <Play width="30" height="30" />
      )}
    </RippleButton>
  );
};

export default PlayButton;
