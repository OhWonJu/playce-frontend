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
    originTrackList,
  } = usePlayerControl();
  const { playTime, setPlayTime } = usePlayTimeControl();

  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef(null);
  const prevOriginTrackListRef = useRef(originTrackList);

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

  const handleForwardTrigger = useCallback(() => {
    if (
      JSON.stringify(prevOriginTrackListRef.current) ===
      JSON.stringify(originTrackList)
    ) {
      playTime > 0
        ? wavesurfer.current.setTime(playTime)
        : wavesurfer.current.setTime(0);
    } else {
      wavesurfer.current.setTime(0);
    }

    prevOriginTrackListRef.current = originTrackList;
  }, [currentTrack, forwardTrigger]); // originTrackList 가 없어도 괜찮은지..?

  useEffect(() => {
    handleForwardTrigger();
  }, [handleForwardTrigger]);

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

  return <div id="waveform" ref={waveformRef}></div>;
};

export default Waveform;
