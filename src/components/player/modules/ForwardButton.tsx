import React from "react";
import _ from "lodash";
import cn from "clsx";

import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { Forward } from "@components/icons";
import { usePlayTimeControl } from "@lib/client/hooks/usePlayTimeControl";
import RippleButton from "@components/ui/RippleButton/RippleButton";

const ForwardButton: React.FC<{ isForward: boolean; className?: string }> = ({
  isForward,
  className,
}) => {
  const rootClassName = cn(
    "w-12 h-12 rounded-full flex justify-center items-center",
    {},
    className,
  );

  const { currentTrack, playList, setCurrentTrack, setForwardMode } =
    usePlayerControl();
  const { playTime, setPlayTime } = usePlayTimeControl();

  // const handleForwardButton = (isForword: boolean) => {
  //   const currentIdx = playList.findIndex(
  //     el => el.trackTitle === currentTrack.trackTitle,
  //   );

  //   let nextIdx = currentIdx;

  //   if (isForword) {
  //     nextIdx = (currentIdx + 1) % playList.length;
  //     setForwardMode("FORWARD");
  //   } else if (playTime < 10) {
  //     // 재생시간이 10초 미만이면 이전 트랙
  //     // 그렇지 않다면 현재트랙
  //     if (currentIdx === 0) nextIdx = playList.length - 1;
  //     else nextIdx = (currentIdx - 1) % playList.length;

  //     setForwardMode("BACKWARD");
  //   } else {
  //     setForwardMode("RESTART");
  //   }

  //   setPlayTime(0);
  //   setCurrentTrack(playList[nextIdx]);
  // };

  // const throttledHandleForwardButton = _.throttle(
  //   (isForward: boolean) => handleForwardButton(isForward),
  //   500,
  // );

  const handleForwardButton = React.useCallback(
    (isForword: boolean) => {
      const currentIdx = playList.findIndex(
        el => el.trackTitle === currentTrack.trackTitle,
      );

      let nextIdx = currentIdx;

      if (isForword) {
        nextIdx = (currentIdx + 1) % playList.length;
        setForwardMode("FORWARD");
      } else if (playTime < 10) {
        // 재생시간이 10초 미만이면 이전 트랙
        // 그렇지 않다면 현재트랙
        if (currentIdx === 0) nextIdx = playList.length - 1;
        else nextIdx = (currentIdx - 1) % playList.length;

        setForwardMode("BACKWARD");
      } else {
        setForwardMode("RESTART");
      }

      setPlayTime(0);
      setCurrentTrack(playList[nextIdx]);
    },
    [
      currentTrack,
      playList,
      setForwardMode,
      playTime,
      setPlayTime,
      setCurrentTrack,
    ],
  );

  const debouncedHandleForwardButton = React.useMemo(
    () =>
      _.debounce((isForward: boolean) => handleForwardButton(isForward), 300),
    [handleForwardButton],
  );

  return (
    <RippleButton
      className={rootClassName}
      clickHandler={() => debouncedHandleForwardButton(isForward)}
    >
      {isForward ? <Forward /> : <Forward className="rotate-180" />}
    </RippleButton>
  );
};

export default ForwardButton;
