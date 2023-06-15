import React, { useCallback, useEffect } from "react";

import { Shuffle } from "@components/icons";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import useTheme from "@lib/client/hooks/useTheme";

const ShuffleButton = () => {
  const theme = useTheme();
  const { shuffle, setShuffle } = usePlayerControl();

  return (
    <div onClick={() => setShuffle(!shuffle)}>
      <Shuffle
        width="20"
        height="20"
        fill={shuffle ? theme.theme_comparsion_color : theme.gray_dark}
      />
    </div>
  );
};

export default ShuffleButton;
