import React from "react";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { Pause, Play } from "@components/icons";

const PlayButton = () => {
  const { setPlay, play } = usePlayerControl();

  return (
    <div
      className="w-16 h-16 rounded-full flex justify-center items-center"
      onClick={() => {
        setPlay(!play);
      }}
    >
      {play === true ? (
        <Pause width="30" height="30" />
      ) : (
        <Play width="30" height="30" />
      )}
    </div>
  );
};

export default PlayButton;
