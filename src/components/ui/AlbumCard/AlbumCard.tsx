import React, { useCallback } from "react";
import Image from "next/image";

import useTheme from "@lib/client/hooks/useTheme";
import { T_Album } from "@lib/client/types";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { EllipsisText, Link, useUI } from "@components/ui";
import { Play } from "@components/icons";

import { AlbumArtWrapper, AlbumCard } from "./AlbumCard.styles";

interface AlbumCardComponentProps {
  data: T_Album;
}

const AlbumCardComponent: React.FC<AlbumCardComponentProps> = ({ data }) => {
  const theme = useTheme();
  const { displayPlayer, openPlayer } = useUI();
  const { setPlay, handlePlayListClick } = usePlayerControl();

  const albumClickHandler = useCallback(() => {
    if (!displayPlayer) {
      openPlayer();
    }

    handlePlayListClick("ALBUM", data);

    setTimeout(() => setPlay(true), 800);
  }, [data]);

  return (
    <AlbumCard className="snap-center group">
      <Link
        href={{
          pathname: "album/[albumId]",
          // query: { album: JSON.stringify(album) },
          query: { albumId: data.title },
        }}
        // as={`/album/${album.title}`}
      >
        <AlbumArtWrapper>
          <Image
            // priority={true}
            src={data.art}
            alt="product image"
            layout="fill"
            sizes="100%"
            draggable={false}
          />
        </AlbumArtWrapper>
        <div className="flex flex-col">
          <EllipsisText context={data.title} lineClamp={1} className="font-bold" />
          <EllipsisText context={data.nameKr} lineClamp={1} className="font-semibold text-xs" />
        </div>
      </Link>
      <div
        className="absolute rounded-full hidden group-hover:block bg-black bg-opacity-50 hover:bg-opacity-100 top-[90px] left-[90px] p-1"
        onClick={albumClickHandler}
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
