import { createRef, useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Hls from "hls.js";

import useTheme from "@lib/client/hooks/useTheme";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { usePlayTimeControl } from "@lib/client/hooks/usePlayTimeControl";
import { useUI } from "@components/ui";

interface WaveformProps {
  url: string;
  peaks: number[];
  trackTime: number;
}

// TODO
// url, peak, totalDuration 넘겨주기
const Waveform = ({ url, peaks, trackTime }: WaveformProps) => {
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
  const video = useRef<HTMLVideoElement>(null);
  const prevOriginTrackIdRef = useRef(originTrackId);

  // CREATE WAVE FORM ============================== //
  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: theme.gray_dark,
        progressColor: theme.theme_comparsion_color,
        barHeight: 0.8,
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 0,
        dragToSeek: true,
        media: video.current,
        backend: "MediaElement",
        peaks: [currentTrack.peaks],
      });

      const hls = new Hls();
      hls.loadSource(currentTrack.trackURL);
      hls.attachMedia(video.current);

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        setTotalTime(currentTrack.trackTime);

        if (play) {
          video.current.play();
          wavesurfer.current.play();
        }

        wavesurfer.current.on("timeupdate", (currentTime: number) =>
          setPlayTime(currentTime),
        );
      });

      return () => {
        if (wavesurfer.current) {
          // WaveSurfer 인스턴스 파기
          wavesurfer.current.unAll();
          wavesurfer.current.destroy();
        }
      };
    }
  }, [currentTrack, waveformRef.current, displayPlayer]);
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
  }, [wavesurfer.current, handleFinish]);
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
    if (wavesurfer.current) {
      handleForwardTrigger();
    }
  }, [wavesurfer.current, handleForwardTrigger]);
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
  }, [wavesurfer.current, play]);
  // ======================================================== 재생/정지 처리 //

  return (
    <>
      <div id="waveform" ref={waveformRef} />
      <video ref={video} className="hidden" />
    </>
  );
};

export default Waveform;
