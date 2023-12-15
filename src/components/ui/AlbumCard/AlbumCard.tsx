import React from "react";
import Image from "next/image";
import Link from "next/link";

import useTheme from "@lib/client/hooks/useTheme";
import { AlbumFreeView } from "@lib/client/types";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { EllipsisText, useUI } from "@components/ui";
import { Play } from "@components/icons";

import { AlbumArtWrapper, AlbumCard } from "./AlbumCard.styles";
import useEventQuery from "@lib/client/hooks/useEventQuery";

interface AlbumCardComponentProps {
  data: AlbumFreeView;
  playAble?: boolean;
}

const AlbumCardComponent: React.FC<AlbumCardComponentProps> = ({
  data,
  playAble = false,
}) => {
  const theme = useTheme();
  const { displayPlayer, openPlayer } = useUI();
  const { setPlay, handlePlayListClick } = usePlayerControl();

  const { refetch } = useEventQuery({
    key: `albumDetail-${data.id}`,
    endPoint: `api/albums/${data.id}`,
  });

  const albumClickHandler = async () => {
    const { album, own } = (await refetch()).data.data;

    if (album && own) {
      handlePlayListClick("ALBUM", album);

      if (!displayPlayer) {
        openPlayer();
      }

      setTimeout(() => setPlay(true), 800);
    }
  };

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
            fill={true}
            sizes="100%"
            style={{ objectFit: "cover" }}
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
      {playAble ? (
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
      ) : null}
    </AlbumCard>
  );
};

export default AlbumCardComponent;
