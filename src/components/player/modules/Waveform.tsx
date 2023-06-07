import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import useTheme from "@lib/client/hooks/useTheme";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { usePlayTimeControl } from "@lib/client/hooks/usePlayTimeControl";
import { umask } from "process";

const Waveform = () => {
  const theme = useTheme();

  const {
    setcurrentTrack,
    play,
    repeatMode,
    currentTrack,
    setTotalTime,
    playList,
    setPlay,
    setPlayList,
  } = usePlayerControl();
  const { playTime, setPlayTime } = usePlayTimeControl();

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
        barRadius: 4,
        cursorWidth: 0,
        // 기타 wavesurfer.js 설정 옵션 추가
      });

      wavesurfer.current.on("audioprocess", () => {
        setPlayTime(wavesurfer.current.getCurrentTime());
      });

      // wavesurfer.js 인스턴스를 cleanup 하기 위해 컴포넌트 언마운트 시 호출
      return () => wavesurfer.current.destroy();
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

    console.log(currentIdx, nextIdx);

    setPlayTime(0);

    if (!stopLast) {
      setcurrentTrack(playList[nextIdx]);
    } else setPlay(false);
  }, [currentTrack, repeatMode, playList]);

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

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.load(currentTrack.audioURL);

      wavesurfer.current.on("ready", () => {
        setTotalTime(wavesurfer.current.getDuration());

        if (playTime > 0) {
          wavesurfer.current.setCurrentTime(playTime);
        } else {
          wavesurfer.current.setCurrentTime(0);
        }

        if (play) {
          wavesurfer.current.play();
        }
      });
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.un("ready");
      }
    };
  }, [currentTrack]);

  useEffect(() => {
    if (wavesurfer.current) {
      if (play) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    }
  }, [play]);

  return <div id="waveform" ref={waveformRef}></div>;
};

export default Waveform;
