import React, { useCallback } from "react";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { Forward } from "@components/icons";
import { usePlayTimeControl } from "@lib/client/hooks/usePlayTimeControl";

const ForwardButton: React.FC<{ isForward: boolean }> = ({ isForward }) => {
  const { currentTrack, playList, setCurrentTrack } = usePlayerControl();
  const { setPlayTime } = usePlayTimeControl();

  const handleForwardButton = (isForword: boolean) => {
    const currentIdx = playList.findIndex(
      el => el.trackTitle === currentTrack.trackTitle,
    );
    let nextIdx;
    if (isForword) {
      nextIdx = (currentIdx + 1) % playList.length;
    } else {
      if (currentIdx === 0) nextIdx = playList.length - 1;
      else nextIdx = (currentIdx - 1) % playList.length;
    }

    setPlayTime(0);
    setCurrentTrack(playList[nextIdx]);
  };

  if (isForward) {
    return (
      <div
        className="__FORWORD__ w-12 h-12 rounded-full flex justify-center items-center"
        onClick={() => handleForwardButton(true)}
      >
        <Forward />
      </div>
    );
  } else {
    return (
      <div
        className="__BACKWARD__ w-12 h-12 rounded-full flex justify-center items-center"
        onClick={() => handleForwardButton(false)}
      >
        <Forward className="rotate-180" />
      </div>
    );
  }
};

export default ForwardButton;
