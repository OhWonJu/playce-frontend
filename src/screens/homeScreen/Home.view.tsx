import React from "react";
import Image from "next/image";

import { VIEW_MODES } from "@lib/client/store/types/viewModeType";
import { AlbumCard, Container, Link } from "@components/ui";

import { ALBUM_CARD_HEIGHT, PLAYER_HEADER_HEIGHT } from "constants/constants";

import { SectionHeaderText, SymbolText } from "src/styles/GlobalStyle";

import { artist } from "mock/mock";
import { Play } from "@components/icons";
import useTheme from "@lib/client/hooks/useTheme";

const myAlbums = [
  artist.ADOY.ablums[0],
  artist.BaekYeRin.ablums[0],
  artist.The1975.ablums[0],
];

interface HomeViewProps {
  viewMode: VIEW_MODES;
  displayPlayer: boolean;
  queueClickHandler: () => void;
  togglePlayerClickhandler: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({
  viewMode,
  displayPlayer,
  queueClickHandler,
  togglePlayerClickhandler,
}) => {
  const theme = useTheme();

  if (viewMode === "INIT") {
    return null;
  }

  return (
    <Container className="overflow-y-scroll scrollbar-hide">
      {/* <div className="flex flex-col pb-5">
        <SymbolText className=" ">PLAYCE {viewMode}</SymbolText>
        <a className="font-semibold text-lg">connect your pysical albums</a>
      </div> */}

      {/*  */}
      <div className="pb-5">
        <button onClick={() => togglePlayerClickhandler()}>
          {displayPlayer ? "CLOSE PLAYER" : ""}
        </button>
      </div>

      {/*  */}
      <div className="__MY_QUEUE__ w-full pb-10">
        <div className="flex w-full justify-between pb-3">
          <SectionHeaderText className="font-bold text-2xl">
            다시 듣기
          </SectionHeaderText>
        </div>
        <div className="__Q_CARD__ flex flex-col">
          <div className="relative w-[180px] h-[180px] rounded-md mb-1 bg-zinc-500 group mr-2">
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
                10 songs • 10 min
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="__MY_ALBUM__ w-full pb-10">
        <div className="flex w-full justify-between pb-3">
          <SectionHeaderText className="font-bold text-2xl">
            MY ALBUM
          </SectionHeaderText>
        </div>
        <div
          style={{ maxHeight: ALBUM_CARD_HEIGHT * 2 + 20 }}
          className="flex flex-col flex-wrap content-start w-full snap-mandatory snap-x overflow-x-scroll scrollbar-hide gap-3"
        >
          {myAlbums.map((album, index) => (
            <AlbumCard key={index} data={album} />
          ))}
        </div>
      </div>

      {/*  */}
      <div className="__MY_PLAY_LIST__ w-full pb-10">
        <div className="flex w-full justify-between pb-3">
          <SectionHeaderText className="font-bold text-2xl">
            MY PLAY LIST
          </SectionHeaderText>
        </div>
        <div className="flex flex-col flex-wrap content-start w-full max-h-[310px] snap-mandatory snap-x overflow-x-scroll scrollbar-hide gap-2">
          {Array.from({ length: 12 }, () => 0).map((arr, index) => (
            <div
              key={index}
              className="flex flex-col min-w-[120px] min-h-[150px] snap-center"
            >
              <div className="w-[120px] h-[120px] rounded-md snap-center mb-1 bg-zinc-500" />
              <div className="flex flex-col">
                <a className="font-semibold text-sm">Title</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*  */}
      <div
        className="__RECOMMEND__ w-full"
        style={{ paddingBottom: PLAYER_HEADER_HEIGHT }}
      >
        <div className="flex w-full justify-between pb-3">
          <SectionHeaderText className="font-bold text-2xl">
            Recommend
          </SectionHeaderText>
        </div>
        <div className="flex flex-col flex-wrap content-start w-full max-h-[350px] snap-mandatory snap-x overflow-x-scroll scrollbar-hide gap-2">
          {Array.from({ length: 12 }, () => 0).map((arr, index) => (
            <div
              key={index}
              className="flex flex-col min-w-[120px] min-h-[170px] snap-center"
            >
              <div className="w-[120px] h-[120px] rounded-md snap-center mb-1 bg-zinc-500" />
              <div className="flex flex-col">
                <a className="font-bold">Title</a>
                <a className="font-semibold text-sm">artist</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HomeView;
