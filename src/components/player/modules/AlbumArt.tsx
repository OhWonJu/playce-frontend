import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import useTheme from "@lib/client/hooks/useTheme";

interface AlbumArtProps {
  artURL?: string;
  isPlay: boolean;
  pinOpacity: MotionValue<number>;
}

const AlbumArt: React.FC<AlbumArtProps> = ({ artURL, isPlay, pinOpacity }) => {
  const { originTrackId, currentTrack } = usePlayerControl();

  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(0.8);
  const prevIsPlayRef = useRef(isPlay);

  useEffect(() => {
    if (isPlay) {
      prevIsPlayRef.current = false;
    }
  }, []);

  useEffect(() => {
    setRotation(0);
  }, [originTrackId]); // originTrackId, currentTrack  둘 중 어떤게 로직에 맞을까..?

  useEffect(() => {
    if (isPlay && !prevIsPlayRef.current) {
      // Play가 false에서 true로 변경되었을 때
      const interval = setInterval(() => {
        setRotation(prevRotation => (prevRotation + speed) % 360);
      }, 16); // 60fps로 애니메이션 실행 (16ms 간격)
      return () => clearInterval(interval); // 컴포넌트가 언마운트되면 setInterval 해제
    } else if (!isPlay && prevIsPlayRef.current) {
      // Play가 true에서 false로 변경되었을 때
      const stopRotation = () => {
        if (speed > 0) {
          setSpeed(prevSpeed => prevSpeed - 0.001); // 감속 효과를 위해 회전 속도 감소
          setRotation(prevRotation => prevRotation + speed);
          requestAnimationFrame(stopRotation);
        }
      };
      requestAnimationFrame(stopRotation);
    }

    prevIsPlayRef.current = isPlay;
  }, [isPlay, speed]);

  if (artURL) {
    return (
      <div className="relative w-full h-full p-[0.2rem]">
        <div className="relative w-full aspect-square rounded-full overflow-hidden flex items-center justify-center shadow-album">
          <div
            className="relative w-full aspect-square rounded-full overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <Image
              src={artURL}
              alt="product image"
              fill={true}
              sizes="100%"
              style={{ objectFit: "cover" }}
              draggable={false}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          </div>
          <motion.div
            className="_PIN_WRAPPER_ absolute w-[16%] flex items-center justify-center"
            style={{ opacity: pinOpacity }}
          >
            <Pin />
          </motion.div>
        </div>
      </div>
    );
  } else null;
};

export default AlbumArt;

const Pin = () => {
  const theme = useTheme();
  return (
    <>
      <div className="grid place-items-center w-full aspect-square rounded-full bg-[#FBFBF9] bg-opacity-50 z-10">
        <div
          className="grid place-items-center w-[85%] aspect-square rounded-full"
          style={{
            backgroundColor: theme.container_bg_color,
          }}
        >
          <div
            className="relative grid place-items-center w-[85%] aspect-square rounded-full shadow-inner border-[1px] border-[#F7F7F5]"
            style={{ borderColor: theme.theme_color }}
          ></div>
          {/* <div className="relative w-[85%] aspect-square bg-zinc-700 rounded-full shadow-inner">
            <div className="absolute grid place-items-center inset-x-0 w-full h-full">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
            <div className="absolute grid place-items-center inset-x-0 w-full h-full rotate-[120deg]">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
            <div className="absolute grid place-items-center inset-x-0 w-full h-full rotate-[240deg]">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
