import Image from "next/image";
import React, { useMemo } from "react";

import { Container } from "@components/ui";
import { T_Album } from "@lib/client/types";

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
    <Container>
      <section className="flex w-full h-[30%] min-h-[200px] space-x-10 mb-4">
        <div className="__ART__ relative h-full aspect-square">
          <Image
            src={album?.art}
            alt="product image"
            layout="fill"
            sizes="100%"
            draggable={false}
          />
        </div>
        <div className="__INFO__ flex flex-col justify-center">
          <a>{album?.title}</a>
          <a>{album?.nameKr}</a>
          <a>genre genre genre</a>
          <div className="flex space-x-2">
            <a>{album?.tracks?.length} songs</a>
            <a>{Math.round(totalTimes / (1000 * 60))} min</a>
          </div>
          <div onClick={() => albumClickHandler(album)}>
            <a>Play</a>
          </div>
        </div>
      </section>
      <section className="w-full h-full bg-blue-50"></section>
    </Container>
  );
};

export default AlbumView;
