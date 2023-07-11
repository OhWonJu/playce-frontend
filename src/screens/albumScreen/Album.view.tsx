import Image from "next/image";
import React, { useMemo } from "react";

import { Container, EllipsisText } from "@components/ui";
import { T_Album } from "@lib/client/types";
import { Play } from "@components/icons";
import { convertTime } from "@lib/client/convertTime";
import { NAV_HEIGHT } from "constants/constants";

interface AlbumViewProps {
  album: T_Album;
  albumClickHandler: (album: any) => void;
}

const AlbumView: React.FC<AlbumViewProps> = ({ album, albumClickHandler }) => {
  const totalTimes = useMemo(
    () => album?.tracks?.reduce((acc, cur) => acc + cur.time, 0),
    [album],
  );

  return (
    <Container className="overflow-y-scroll scrollbar-hide">
      <section className="relative flex w-full h-[30%] min-h-[200px] space-x-10 mb-4">
        <div className="__ART__ relative h-full aspect-square rounded-md overflow-hidden shadow-sm">
          <Image
            src={album?.art}
            alt="product image"
            layout="fill"
            sizes="100%"
            draggable={false}
          />
        </div>
        <div className="__INFO__ flex flex-col justify-center">
          <EllipsisText
            context={album?.title}
            lineClamp={1}
            lineHeight={3}
            className="font-extrabold text-3xl"
          />
          <a className="font-bold pb-3">{album?.nameKr}</a>
          <a className="text-zinc-400 font-semibold text-sm">
            EP • 2022 • genre genre genre
          </a>
          <div className="flex space-x-2">
            <a className="text-zinc-400 font-semibold text-sm">
              {album?.tracks?.length} songs • {Math.round(totalTimes / 60)} min
            </a>
          </div>
          <div className="absolute bottom-0 flex w-full space-x-2">
            <div
              onClick={() => albumClickHandler(album)}
              className="flex justify-around items-center bottom-0 w-24 px-2 py-3 rounded-md bg-zinc-800 hover:bg-black"
            >
              <Play
                width="22"
                height="22"
                fill={"#FFFFFF"}
                stroke={"#FFFFFF"}
              />
              <a className="font-semibold text-white">Play</a>
            </div>
            {/*  */}
            <div className="flex justify-around items-center bottom-0 w-24 px-2 py-3 rounded-md bg-zinc-800 hover:bg-black">
              <a className="font-semibold text-white">Buy</a>
            </div>
            {/*  */}
            <div className="flex justify-around items-center bottom-0 w-24 px-2 py-3 rounded-md bg-zinc-800 hover:bg-black">
              <a className="font-semibold text-sm text-white">Add To Cart</a>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col w-full h-[70%] space-y-2">
        {album.tracks.map((track, index) => (
          <div
            key={index}
            className="relative flex items-center w-full min-h-[45px]"
          >
            <div className="w-[45px] h-full grid place-items-center mr-4">
              <a className="font-semibold">{index + 1}.</a>
            </div>
            <a className="font-semibold">{track.title}</a>
            <div className="absolute flex items-center right-0 h-full">
              {convertTime(track.time, "string")}
            </div>
          </div>
        ))}
      </section>
    </Container>
  );
};

export default AlbumView;
