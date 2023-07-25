import Image from "next/image";
import React, { useMemo } from "react";

import { Container, EllipsisText } from "@components/ui";
import { AlbumDetail, T_Album } from "@lib/client/types";
import { Play } from "@components/icons";
import { convertTime } from "@lib/client/convertTime";

import {
  AlbumArt,
  AlbumButton,
  AlbumInfo,
  AlbumInfoWrapper,
  AlbumUtils,
} from "./Album.styles";

interface AlbumViewProps {
  album: AlbumDetail;
  isOwn: boolean;
  albumClickHandler: (album: any) => void;
}

const AlbumView: React.FC<AlbumViewProps> = ({
  album,
  isOwn,
  albumClickHandler,
}) => {
  const totalTimes = useMemo(
    () => album?.tracks?.reduce((acc, cur) => acc + cur.trackTime, 0),
    [album],
  );

  return (
    <Container className="overflow-y-scroll scrollbar-hide">
      <AlbumInfoWrapper>
        <AlbumArt>
          <Image
            priority={true}
            src={album?.albumArtURL}
            alt="album art"
            layout="fill"
            sizes="100%"
            draggable={false}
          />
        </AlbumArt>
        <AlbumUtils>
          <AlbumInfo>
            <EllipsisText
              context={album?.albumName}
              lineClamp={1}
              lineHeight={3}
              className="font-extrabold text-3xl"
            />
            <EllipsisText
              context={album?.artist?.artistName}
              lineClamp={1}
              className="font-bold pb-2"
            />
            <a className="text-zinc-400 font-semibold text-sm">EP • 2022</a>
            <a className="text-zinc-400 font-semibold text-sm">
              genre genre genre
            </a>
            <div className="flex space-x-2">
              <a className="text-zinc-400 font-semibold text-sm">
                {album?.tracks?.length} songs • {Math.round(totalTimes / 60)}{" "}
                min
              </a>
            </div>
          </AlbumInfo>
          <AlbumButton className="flex w-full space-x-2">
            {isOwn ? (
              <div
                onClick={() => albumClickHandler(album)}
                className="flex justify-around items-center bottom-0 w-28 px-2 py-3 rounded-md bg-zinc-800 hover:bg-black"
              >
                <Play
                  width="22"
                  height="22"
                  fill={"#FFFFFF"}
                  stroke={"#FFFFFF"}
                />
                <a className="font-semibold text-white">Play</a>
              </div>
            ) : (
              <>
                <div className="flex justify-around items-center bottom-0 w-28 px-2 py-3 rounded-md bg-zinc-800 hover:bg-black">
                  <a className="font-semibold text-white">Buy</a>
                </div>
                <div className="flex justify-around items-center bottom-0 w-28 px-2 py-3 rounded-md bg-zinc-800 hover:bg-black">
                  <a className="font-semibold text-sm text-white">
                    Add To Cart
                  </a>
                </div>
              </>
            )}
          </AlbumButton>
        </AlbumUtils>
      </AlbumInfoWrapper>

      {/* TRACK LIST */}
      <section className="flex flex-col w-full space-y-2">
        {album?.tracks?.map((track, index) => (
          <div
            key={index}
            className="relative flex items-center w-full min-h-[45px]"
          >
            <div className="w-[45px] h-full grid place-items-center mr-4">
              <a className="font-semibold">{index + 1}.</a>
            </div>
            <a className="font-semibold">{track.trackTitle}</a>
            <div className="absolute flex items-center right-0 h-full">
              {convertTime(track.trackTime, "string")}
            </div>
          </div>
        ))}
      </section>
    </Container>
  );
};

export default AlbumView;
