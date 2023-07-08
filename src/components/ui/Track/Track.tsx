import React, { useEffect, useRef } from "react";
import Image from "next/image";

import { TRACK } from "@lib/client/store/types/playerControlType";

import { TrackDeleteButton, TrackMotion, TrackWrapper } from "./Track.styles";
import {
  PanInfo,
  useAnimate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useQueue } from "@lib/client/hooks/useQueue";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";

interface TrackComponentProps {
  data: TRACK;
  trackListType: "ALBUM" | "LIST" | "QUEUE";
  focused?: boolean;
  clickHandler?: () => void;
  [key: string]: any;
}

const TrackComponent: React.FC<TrackComponentProps> = ({
  data,
  trackListType,
  focused = false,
  clickHandler = () => null,
  ...rest
}) => {
  const { style = {} } = rest;

  const { addTrack: addPlayListTrack, deleteTrack: delPlayListTrack } =
    usePlayerControl();
  const { addTrack: addQueueList, deleteTrack: delQueuList } = useQueue();

  const [scope, animate] = useAnimate();
  const x = useMotionValue(0);
  const btnOpacity = useTransform(x, [-80, -15], [1, 0]);

  const dragStarted = useRef(false);

  function handleDragStart() {
    dragStarted.current = true;
  }

  useEffect(() => {
    x.set(0);
  }, []);

  function handleOnDrag(event: any, info: PanInfo) {
    const delta = info.delta;

    // left
    if (delta.x < 0) {
      if (trackListType !== "ALBUM") {
        x.set(Math.max(x.get() + delta.x, -80));
      } else {
        // when ALBUM, blocking go to left
        x.set(0);
      }
    }

    // right
    if (delta.x > 0) {
      if (trackListType !== "QUEUE") x.set(Math.min(x.get() + delta.x, 100));
      else x.set(Math.min(x.get() + delta.x, 0));
    }
  }

  function handleOnDragEnd(event: any, info: PanInfo) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // DELETE MOTION
    if (trackListType !== "ALBUM") {
      if (offset < -100 || velocity < -500) {
        animate(x, -80, { duration: 0.5 });
      } else {
        animate(x, 0, { duration: 0.5 });
      }
    }

    // ADD TO QUEUE
    if (trackListType !== "QUEUE") {
      if (offset > 100 || velocity > 500) {
        animate(scope.current, { x: 0 }, { duration: 0.5 });
        setTimeout(() => {
          addPlayListTrack(data);
          addQueueList(data);
        }, 200);
      }
    }

    dragStarted.current = false;
  }

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!dragStarted.current) clickHandler();
  }

  function handleDeleteBtn() {
    if (trackListType === "QUEUE") {
      delPlayListTrack(data);
      delQueuList(data);
    }
    if (trackListType === "LIST") null;
  }

  return (
    <TrackWrapper
      style={{ ...style }}
      whileTap={{ cursor: "grabbing" }}
      // layout
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
    >
      <TrackMotion
        onClick={handleClick}
        $focused={focused}
        drag="x"
        dragDirectionLock
        onDragStart={handleDragStart}
        onDrag={handleOnDrag}
        onDragEnd={handleOnDragEnd}
        style={{ x }}
        // dragElastic={0}
        dragMomentum={false}
        dragPropagation={false}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        ref={scope}
      >
        <section className="relative h-full aspect-square rounded-full overflow-hidden mr-2">
          <Image
            src={data.ablumArtURL}
            alt="product image"
            layout="fill"
            sizes="100%"
            draggable={false}
          />
        </section>
        <section className="flex flex-col">
          <a className="font-semibold text-base">{data.trackTitle}</a>
          <a className="font-medium text-xs">{data.artistKo}</a>
        </section>
      </TrackMotion>
      {trackListType !== "ALBUM" ? (
        <TrackDeleteButton
          style={{ opacity: btnOpacity }}
          onClick={handleDeleteBtn}
        >
          <a>delete</a>
        </TrackDeleteButton>
      ) : null}
    </TrackWrapper>
  );
};

export default TrackComponent;