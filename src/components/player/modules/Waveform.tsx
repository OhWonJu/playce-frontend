import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

import useTheme from "@lib/client/hooks/useTheme";

const Waveform = () => {
  const theme = useTheme();
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: theme.gray_dark,
        progressColor: theme.theme_comparsion_color,
        barHeight: 0.8,
        barWidth: 2.5,
        barRadius: 5,
        cursorWidth: 0,
        // 기타 wavesurfer.js 설정 옵션 추가
      });

      // wavesurfer.js에 대한 이벤트 핸들러 등록
      wavesurfer.on("ready", () => {
        // wavesurfer가 준비되면 실행되는 코드
        wavesurfer.play();
      });

      wavesurfer.load("/adoy_love/adoy-love-02-young.mp3");

      // wavesurfer.js 인스턴스를 cleanup 하기 위해 컴포넌트 언마운트 시 호출
      return () => wavesurfer.destroy();
    }
  }, []);

  return <div ref={waveformRef}></div>;
};

export default Waveform;
