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
          <p>{convertTime(playTime, "string")}</p>
          <p>{totalTime === 0 ? "0:00" : convertTime(totalTime, "string")}</p>
        </>
      )}
    </>
  );
};

export default PlayTimer;
