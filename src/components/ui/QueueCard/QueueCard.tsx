import { Play } from "@components/icons";
import { convertTime } from "@lib/client/convertTime";
import useTheme from "@lib/client/hooks/useTheme";
import { QueueFreeView } from "@lib/client/types";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface QueueCardProps {
  data: QueueFreeView;
  queueClickHandler: () => void;
}

const QueueCard: React.FC<QueueCardProps> = ({ data, queueClickHandler }) => {
  const theme = useTheme();

  return (
    <div className="__Q_CARD__ flex flex-col">
      <div className="relative w-[180px] h-[180px] rounded-md mb-1 overflow-hidden group mr-2">
        <Image
          priority={true}
          src={data?.queueThumbNail[0]}
          alt="product image"
          layout="fill"
          sizes="100%"
          draggable={false}
        />
        <div className="absolute left-0 top-0 w-full h-full bg-white bg-opacity-50 backdrop-blur-xl"/>
        <div
          className="absolute rounded-full hidden group-hover:block bg-black bg-opacity-50 hover:bg-opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2"
          onClick={queueClickHandler}
        >
          <Play
            width="40"
            height="40"
            fill={theme.background_color}
            strokeWidth={0}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <a className="font-semibold text-sm">My Queue</a>
        <div className="flex space-x-2">
          <a className="text-zinc-400 font-semibold text-sm">
            {`${data?.songCount} songs • ${
              convertTime(data?.totalPlayTime, "number")[0]
            } min`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default QueueCard;
