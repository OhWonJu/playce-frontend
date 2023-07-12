import React, { useCallback, useEffect } from "react";

import { Shuffle } from "@components/icons";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import useTheme from "@lib/client/hooks/useTheme";
import RippleButton from "@components/ui/RippleButton/RippleButton";

const ShuffleButton = () => {
  const theme = useTheme();
  const { shuffle, setShuffle, doShuffle, originTrackList } =
    usePlayerControl();

  useEffect(() => {
    doShuffle(originTrackList);
  }, [shuffle]);

  return (
    <RippleButton className="p-2 rounded-full" clickHandler={() => setShuffle(!shuffle)}>
      <Shuffle
        width="22"
        height="22"
        fill={shuffle ? theme.theme_comparsion_color : theme.gray_dark}
      />
    </RippleButton>
  );
};

export default ShuffleButton;
