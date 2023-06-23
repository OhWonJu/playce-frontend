import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import useTheme from "@lib/client/hooks/useTheme";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { usePlayTimeControl } from "@lib/client/hooks/usePlayTimeControl";

const Waveform = () => {
  const theme = useTheme();

  const {
    setCurrentTrack,
    play,
    repeatMode,
    forwardMode,
    currentTrack,
    setTotalTime,
    playList,
    setPlay,
    originTrackList,
    setForwardMode,
  } = usePlayerControl();
  const { playTime, setPlayTime } = usePlayTimeControl();

  const prevOriginTrackListRef = useRef(originTrackList);

  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef(null);

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
        // 기타 wavesurfer.js 설정 옵션 추가
      });

      wavesurfer.current.on("timeupdate", (currentTime: number) =>
        setPlayTime(currentTime),
      );

      return () => {
        // WaveSurfer 인스턴스 파기
        wavesurfer.current.unAll();
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      };
    }
  }, []);
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

    // console.log(currentIdx, nextIdx);

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

  const handleTrackChange = useCallback(async () => {
    setTotalTime(wavesurfer.current.getDuration());

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

    if (play) {
      await wavesurfer.current.play();
    }

    return async () => {
      await wavesurfer.current.empty();
      await wavesurfer.current.pause();
    };
  }, [currentTrack, originTrackList, forwardMode]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.pause();
      wavesurfer.current.load(currentTrack.audioURL);
      wavesurfer.current.on("ready", handleTrackChange);
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.un("ready", handleTrackChange);
      }
    };
  }, [handleTrackChange]);

  const handlePlay = async () => {
    if (play) {
      await wavesurfer.current.play();
    } else await wavesurfer.current.pause();
  };

  useEffect(() => {
    if (wavesurfer.current) {
      handlePlay();
    }
  }, [play]);

  return <div id="waveform" ref={waveformRef}></div>;
};

export default Waveform;
