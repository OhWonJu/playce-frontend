import Image from "next/image";
import React, { useMemo } from "react";

import { Container, EllipsisText, RippleButton } from "@components/ui";
import { AlbumDetail } from "@lib/client/types";
import { DotMenu, Play } from "@components/icons";

import {
  AlbumArt,
  AlbumButton,
  AlbumInfo,
  AlbumInfoWrapper,
  AlbumUtils,
} from "./Album.styles";
import { TrackLi } from "./modules";

interface AlbumViewProps {
  album: AlbumDetail;
  isOwn: boolean;
  albumClickHandler: (album: any) => void;
}

const AlbumView = ({ album, isOwn, albumClickHandler }: AlbumViewProps) => {
  const totalTimes = useMemo(
    () => album?.tracks?.reduce((acc, cur) => acc + cur.trackTime, 0),
    [album],
  );

  return (
    <Container className="overflow-y-scroll scrollbar-hide">
      <AlbumInfoWrapper>
        <AlbumArt className="group">
          <Image
            priority={true}
            src={album?.albumArtURL}
            alt="album art"
            fill={true}
            sizes="100%"
            style={{ objectFit: "cover" }}
            draggable={false}
          />
          <div className="relative w-full h-full hidden group-hover:block group-hover:bg-gradient-to-b from-black">
            <div className="absolute top-1 right-1">
              <RippleButton
                className="p-2 rounded-full"
                clickHandler={() => console.log("!")}
              >
                <DotMenu fill={"#E3E3E3"} />
              </RippleButton>
            </div>
          </div>
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
                {album?.tracks?.length} 곡 • {Math.round(totalTimes / 60)} 분
              </a>
            </div>
          </AlbumInfo>
          <AlbumButton className="flex w-full space-x-2">
            {isOwn ? (
              <div
                onClick={() => albumClickHandler(album)}
                className="bottom-0 w-28  rounded-md bg-black"
              >
                <RippleButton className="flex justify-around items-center w-full h-full px-2 py-3">
                  <Play
                    width="22"
                    height="22"
                    fill={"#FFFFFF"}
                    stroke={"#FFFFFF"}
                  />
                  <a className="font-semibold text-white">Play</a>
                </RippleButton>
              </div>
            ) : (
              <>
                <div className="bottom-0 w-28">
                  <RippleButton className="grid place-content-center w-full h-full px-2 py-3 rounded-md bg-black">
                    <a className="font-semibold text-white">Buy</a>
                  </RippleButton>
                </div>
                <div className="bottom-0 w-28">
                  <RippleButton className="grid place-content-center w-full h-full px-2 py-3 rounded-md bg-black">
                    <a className="font-semibold text-sm text-white">
                      Add To Cart
                    </a>
                  </RippleButton>
                </div>
              </>
            )}
          </AlbumButton>
        </AlbumUtils>
      </AlbumInfoWrapper>

      {/* TRACK LIST */}
      <ul className="flex flex-col w-full space-y-2">
        {album?.tracks?.map((track, index) => (
          <TrackLi
            key={index}
            index={index}
            data={track}
            isOwn={isOwn}
            trackListType="ALBUM"
          />
        ))}
      </ul>
    </Container>
  );
};

export default AlbumView;
