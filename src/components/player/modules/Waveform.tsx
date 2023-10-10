import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import useTheme from "@lib/client/hooks/useTheme";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { usePlayTimeControl } from "@lib/client/hooks/usePlayTimeControl";
import { useUI } from "@components/ui";

const Waveform: React.FC<{ url: string }> = ({ url }) => {
  const theme = useTheme();

  const { displayPlayer } = useUI();
  const {
    setCurrentTrack,
    play,
    repeatMode,
    forwardTrigger,
    currentTrack,
    setTotalTime,
    playList,
    setPlay,
    originTrackId,
    originTrackList,
  } = usePlayerControl();
  const { playTime, setPlayTime } = usePlayTimeControl();

  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef(null);
  const prevOriginTrackIdRef = useRef(originTrackId);

  // CREATE WAVE FORM ============================== //
  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: theme.gray_dark,
        progressColor: theme.theme_comparsion_color,
        barHeight: 0.7,
        barWidth: 2.5,
        barRadius: 2,
        cursorWidth: 0,
        fetchParams: {
          cache: "default",
          mode: "no-cors",
          method: "GET",
          credentials: "same-origin",
          redirect: "follow",
          referrer: "client",
        },
        // 기타 wavesurfer.js 설정 옵션 추가
      });

      wavesurfer.current.load(url);

      wavesurfer.current.on("ready", () => {
        setTotalTime(wavesurfer.current.getDuration());

        if (play) wavesurfer.current.play();
      });

      wavesurfer.current.on("timeupdate", (currentTime: number) =>
        setPlayTime(currentTime),
      );

      return () => {
        // WaveSurfer 인스턴스 파기
        wavesurfer.current.unAll();
        wavesurfer.current.destroy();
      };
    }
  }, [url, displayPlayer]);
  // ============================== CREATE WAVE FORM //

  // 음원 재생 완료 처리 ==================================== //
  const handleFinish = useCallback(() => {
    const currentIdx = playList.findIndex(
      el => el.trackTitle === currentTrack.trackTitle,
    );
    let nextIdx = 0;
    let stopLast = false;

    if (repeatMode === "REPEAT") {
      nextIdx = currentIdx;
      wavesurfer.current?.play();
    } else if (repeatMode === "REPEAT_ALL") {
      nextIdx = (currentIdx + 1) % playList.length;
    } else if (repeatMode === "NONE") {
      if (currentIdx < playList.length - 1) {
        nextIdx = currentIdx + 1;
      } else {
        stopLast = true;
      }
    }

    setPlayTime(0);

    if (!stopLast) {
      setCurrentTrack(playList[nextIdx]);
    } else setPlay(false);
  }, [currentTrack, playList, repeatMode, playList]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.on("finish", handleFinish);
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.un("finish", handleFinish);
      }
    };
  }, [handleFinish]);
  // ==================================== 음원 재생 완료 처리 //

  // 트랙 변경 처리 ========================================= //
  const handleForwardTrigger = useCallback(() => {
    // forward 버튼에 의해 currentTrack 이 바뀌거나
    // playList 의 변화에 따른 플레이타임 갱신
    if (
      JSON.stringify(prevOriginTrackIdRef.current) ===
      JSON.stringify(originTrackId)
    ) {
      // 동일 playList의 경우
      // playTime 이 0 이상이라면 forward 액션이 아닌, 트랙 재호출 등의 액션일 수 있음
      // 연속적인 플레이를 위한 처리
      playTime > 0
        ? wavesurfer.current.setTime(playTime) // 지속적으로 플레이
        : wavesurfer.current.setTime(0); // Forward 액션이므로 플레이 시간 초기화
    } else {
      // playList기 다른 경우 플레이 시간 초기화
      wavesurfer.current.setTime(0);
    }

    prevOriginTrackIdRef.current = originTrackId;
  }, [currentTrack, originTrackId, forwardTrigger]);

  useEffect(() => {
    handleForwardTrigger();
  }, [handleForwardTrigger]);
  // ========================================= 트랙 변경 처리 //

  // 재생/정지 처리 ======================================================== //
  const handlePlay = async () => {
    if (play) {
      await wavesurfer.current.play();
    } else await wavesurfer.current.pause();
  };

  useEffect(() => {
    // load 되기 전 handlePlay() 실행을 막기 위해
    if (wavesurfer.current && wavesurfer.current.getDuration() > 0) {
      handlePlay();
    }
  }, [play]);
  // ======================================================== 재생/정지 처리 //

  return <div id="waveform" ref={waveformRef}></div>;
};

export default Waveform;
