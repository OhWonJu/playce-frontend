import React, { useCallback } from "react";

import { Repeat } from "@components/icons";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import useTheme from "@lib/client/hooks/useTheme";

const RepeatButton = () => {
  const theme = useTheme();
  const { repeatMode, setRepeatMode } = usePlayerControl();

  const _handleClick = useCallback(() => {
    switch (repeatMode) {
      case "NONE": {
        setRepeatMode("REPEAT_ALL");
        return;
      }
      case "REPEAT": {
        setRepeatMode("NONE");
        return;
      }
      case "REPEAT_ALL": {
        setRepeatMode("REPEAT");
        return;
      }
    }
  }, [setRepeatMode]);

  return (
    <div
      className="relative grid place-items-center"
      onClick={() => _handleClick()}
    >
      {repeatMode === "NONE" ? (
        <Repeat fill={theme.gray_dark} />
      ) : repeatMode === "REPEAT_ALL" ? (
        <Repeat />
      ) : (
        <>
          <Repeat />
          <a
            className="absolute inset-0 grid place-items-center w-full h-full font-extrabold"
            style={{
              paddingTop: 1,
              fontSize: 5,
            }}
          >
            1
          </a>
        </>
      )}
    </div>
  );
};

export default RepeatButton;
