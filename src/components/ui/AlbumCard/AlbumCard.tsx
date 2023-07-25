import React, { useCallback } from "react";
import Image from "next/image";

import useTheme from "@lib/client/hooks/useTheme";
import { AlbumFreeView, T_Album } from "@lib/client/types";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { EllipsisText, Link, useUI } from "@components/ui";
import { Play } from "@components/icons";

import { AlbumArtWrapper, AlbumCard } from "./AlbumCard.styles";

interface AlbumCardComponentProps {
  data: AlbumFreeView;
  isOwn: boolean;
}

const AlbumCardComponent: React.FC<AlbumCardComponentProps> = ({
  data,
  isOwn,
}) => {
  const theme = useTheme();
  const { displayPlayer, openPlayer } = useUI();
  const { setPlay, handlePlayListClick } = usePlayerControl();

  // const albumClickHandler = useCallback(() => {
  //   if (!displayPlayer) {
  //     openPlayer();
  //   }

  //   handlePlayListClick("ALBUM", data);

  //   setTimeout(() => setPlay(true), 800);
  // }, [data]);

  return (
    <AlbumCard className="snap-center group">
      <Link
        href={{
          pathname: `album/${data.id}`,
          // query: { albumName: data.albumName, id: data.id, isOwn: isOwn },
        }}
        // as={`/album/${data.id}`}
      >
        <AlbumArtWrapper>
          <Image
            priority={true}
            src={data.albumArtURL}
            alt="product image"
            layout="fill"
            sizes="100%"
            draggable={false}
          />
        </AlbumArtWrapper>
        <div className="flex flex-col">
          <EllipsisText
            context={data.albumName}
            lineClamp={1}
            className="font-bold"
          />
          <EllipsisText
            context={data.artist.artistName}
            lineClamp={1}
            className="font-semibold text-xs"
          />
        </div>
      </Link>
      <div
        className="absolute rounded-full hidden group-hover:block bg-black bg-opacity-50 hover:bg-opacity-100 top-[90px] left-[90px] p-1"
        // onClick={albumClickHandler}
      >
        <Play
          width="20"
          height="20"
          fill={theme.background_color}
          strokeWidth={0}
        />
      </div>
    </AlbumCard>
  );
};

export default AlbumCardComponent;
