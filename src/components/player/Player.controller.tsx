import React, { useEffect } from "react";

import { useUI } from "@components/ui";

import PlayerDesktopView from "./Player.Desktop.view";
import PlayerMobileView from "./Player.Mobile.view";
import MainSheetProgressStore from "@lib/client/store/simpleStore/mainSheetProgress";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

const PlayerController = () => {
  const { viewMode } = useUI();
  const { setProgress } = MainSheetProgressStore();
  const { play, setPlay } = usePlayerControl();

  // Warning: Cannot update a component (`A`) while rendering a different component (`B`). 에러 발생점
  // useMemo => useEffect
  // useMemo에 문제가 ... 렌더링 중에 setState가 발생해서라고 한다.
  // useMemo 는 변경으로부터 값을 받기 위해서지... 변경으로부터 값을 수정하는 기능으로 사용해서는 안될듯
  // useMemo(() => {
  //   if (viewMode === "DESKTOP") {
  //     setProgress(0);
  //   }
  // }, [viewMode]);

  useEffect(() => {
    if (viewMode === "DESKTOP") {
      setProgress(0);
    }
  }, [viewMode]);

  return (
    <>{viewMode !== "DESKTOP" ? <PlayerMobileView /> : <PlayerDesktopView />}</>
  );
  // if (viewMode !== "DESKTOP") return <PlayerMobileView />;
  // else return <PlayerDesktopView />;/
};

export default PlayerController;
