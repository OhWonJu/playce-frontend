import React, { useCallback } from "react";
import { PlayIndicatorBackGround, PlayIndicatorBar } from "../Navigator.styles";
import { usePlayTimeControl } from "@lib/client/hooks/usePlayTimeControl";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

const PlayIndicator = () => {
  const { totalTime } = usePlayerControl();
  const { playTime } = usePlayTimeControl();

  const getPercent = useCallback(
    (playTime: number, totalTime: number): number => {
      return Math.floor((playTime / totalTime) * 100);
    },
    [],
  );

  return (
    <PlayIndicatorBackGround>
      <PlayIndicatorBar percent={getPercent(playTime, totalTime)} />
    </PlayIndicatorBackGround>
  );
};

export default PlayIndicator;
