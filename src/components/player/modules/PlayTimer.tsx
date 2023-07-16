import React from "react";

import { convertTime } from "@lib/client/convertTime";
import { usePlayTimeControl } from "@lib/client/hooks/usePlayTimeControl";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

const PlayTimer = () => {
  const { totalTime } = usePlayerControl();
  const { playTime } = usePlayTimeControl();


  return (
    <>
      {totalTime && (
        <>
          <a>{convertTime(playTime, "string")}</a>
          <a>{totalTime === 0 ? "0:00" : convertTime(totalTime, "string")}</a>
        </>
      )}
    </>
  );
};

export default PlayTimer;
