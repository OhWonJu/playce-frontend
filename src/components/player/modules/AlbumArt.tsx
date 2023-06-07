import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";

interface AlbumArtProps {
  artURL?: string;
  isPlay: boolean;
  pinOpacity: MotionValue<number>;
}

const AlbumArt: React.FC<AlbumArtProps> = ({ artURL, isPlay, pinOpacity }) => {
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(0.8);
  const prevIsPlayRef = useRef(isPlay);

  useEffect(() => {
    if (isPlay && !prevIsPlayRef.current) {
      // Play가 false에서 true로 변경되었을 때
      const interval = setInterval(() => {
        setRotation(prevRotation => prevRotation + speed);
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
      <div
        className="relative w-full aspect-square rounded-full overflow-hidden flex items-center justify-center"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
        // animate={controls}
        // animate={{ rotate: "1turn" }}
        // transition={{
        //   duration: 7,
        //   repeat: isPlay ? Infinity : 0,
        //   ease: "linear",
        // }}
      >
        <Image
          priority
          src={artURL}
          alt="product image"
          layout="fill"
          // fill={true}
          sizes="100%"
          // style={{ objectFit: "cover" }}
          draggable={false}
        />
        <motion.div
          className="_PIN_WRAPPER_ relative w-[14%] flex items-center justify-center"
          style={{ opacity: pinOpacity }}
        >
          <Pin />
        </motion.div>
      </div>
    );
  } else null;
};

export default AlbumArt;

const Pin = () => {
  return (
    <>
      <div className="grid place-items-center w-full aspect-square rounded-full bg-[#FBFBF9] bg-opacity-50 z-10">
        <div
          className="grid place-items-center w-[85%] aspect-square rounded-full"
          style={{
            backgroundColor: "#FBFBF9",
          }}
        >
          <div className="relative w-[85%] aspect-square bg-zinc-700 rounded-full">
            <div className="absolute grid place-items-center inset-x-0 w-full h-full">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
            <div className="absolute grid place-items-center inset-x-0 w-full h-full rotate-[120deg]">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
            <div className="absolute grid place-items-center inset-x-0 w-full h-full rotate-[240deg]">
              <div className="absolute w-[10%] h-[35%] bg-zinc-400 bottom-0" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
