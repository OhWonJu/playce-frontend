import React, { useCallback } from "react";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import useTheme from "@lib/client/hooks/useTheme";

import { Repeat } from "@components/icons";
import RippleButton from "@components/ui/RippleButton/RippleButton";

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
    <RippleButton
      className="relative grid place-items-center p-2 rounded-full"
      clickHandler={_handleClick}
    >
      {repeatMode === "NONE" ? (
        <Repeat fill={theme.gray_dark} />
      ) : repeatMode === "REPEAT_ALL" ? (
        <Repeat fill={theme.theme_comparsion_color} />
      ) : (
        <>
          <Repeat fill={theme.theme_comparsion_color} />
          <a
            className="absolute inset-0 grid place-items-center w-full h-full font-extrabold"
            style={{
              paddingTop: 2,
              fontSize: 9,
            }}
          >
            1
          </a>
        </>
      )}
    </RippleButton>
  );
};

export default RepeatButton;
