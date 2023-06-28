import React from "react";
import Image from "next/image";

import { VIEW_MODES } from "@lib/client/store/types/viewModeType";
import { Container, Link } from "@components/ui";

import { PLAYER_HEADER_HEIGHT } from "constants/constants";

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
  albumClickHandler: (album: any) => void;
  togglePlayerClickhandler: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({
  viewMode,
  displayPlayer,
  albumClickHandler,
  togglePlayerClickhandler,
}) => {
  const theme = useTheme();

  if (viewMode === "INIT") {
    return null;
  }

  return (
    <Container className="overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col pb-5">
        <SymbolText className=" ">PLAYCE {viewMode}</SymbolText>
        <a className="font-semibold text-lg">connect your pysical albums</a>
      </div>

      {/*  */}
      <div className="pb-5">
        <button onClick={() => togglePlayerClickhandler()}>
          {displayPlayer ? "CLOSE PLAYER" : ""}
        </button>
      </div>

      {/*  */}
      <div className="__MY_ALBUM__ w-full pb-10">
        <div className="flex w-full justify-between pb-3">
          <SectionHeaderText className="font-bold text-2xl">
            MY ALBUM
          </SectionHeaderText>
          <div
            className="font-semibold text-xs text-center px-1.5 py-1 rounded-full"
            style={{ borderWidth: 1 }}
          >
            <a className="">more</a>
          </div>
        </div>
        <div className="flex flex-col flex-wrap content-start w-full max-h-[350px] snap-mandatory snap-x overflow-x-scroll scrollbar-hide gap-2">
          {myAlbums.map((album, index) => (
            <div
              className="relative flex flex-col min-w-[120px] min-h-[170px] snap-center group"
              // onClick={() => albumClickHandler(album)}
            >
              <Link
                key={index}
                href={{
                  pathname: "album/[albumId]",
                  // query: { album: JSON.stringify(album) },
                  query: { albumId: album.title },
                }}
                // as={`/album/${album.title}`}
              >
                <div className="relative w-[120px] h-[120px] rounded-md overflow-hidden snap-center mb-1 ">
                  <Image
                    // priority={true}
                    src={album.art}
                    alt="product image"
                    layout="fill"
                    sizes="100%"
                    draggable={false}
                  />
                </div>
                <div className="flex flex-col">
                  <a className="font-bold">{album.title}</a>
                  <a className="font-semibold text-sm">{album.nameKr}</a>
                </div>
              </Link>
              <div
                className="absolute rounded-full hidden group-hover:block bg-black bg-opacity-50 hover:bg-opacity-100 top-[90px] left-[90px] p-1"
                onClick={() => albumClickHandler(album)}
              >
                <Play
                  width="20"
                  height="20"
                  fill={theme.background_color}
                  strokeWidth={0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*  */}
      <div className="__MY_PLAY_LIST__ w-full pb-10">
        <div className="flex w-full justify-between pb-3">
          <SectionHeaderText className="font-bold text-2xl">
            MY PLAY LIST
          </SectionHeaderText>
          <div
            className="font-semibold text-xs text-center px-1.5 py-1 rounded-full"
            style={{ borderWidth: 1 }}
          >
            <a className="">more</a>
          </div>
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
          <div
            className="font-semibold text-xs text-center px-1.5 py-1 rounded-full"
            style={{ borderWidth: 1 }}
          >
            <a className="">more</a>
          </div>
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
