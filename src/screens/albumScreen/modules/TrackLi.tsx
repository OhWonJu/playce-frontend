import React from "react";

import { convertTime } from "@lib/client/convertTime";
import { Track } from "@lib/client/types";
import { Col, Row } from "src/styles/GlobalStyle";
import { QueuePlayIconBox, TrackLISubA } from "../Album.styles";
import { DotMenu, Play, QueueList } from "@components/icons";
import { RippleButton } from "@components/ui";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { useQueue } from "@lib/client/hooks/useQueue";

interface TrackLIComponentProps {
  index: number;
  data: Track;
  isOwn: boolean;
  trackListType: "ALBUM" | "LIST" | "QUEUE";
}

const TrackLiComponent: React.FC<TrackLIComponentProps> = ({
  index,
  data,
  isOwn,
  trackListType,
}) => {
  const { addTrack: addPlayListTrack } = usePlayerControl();
  const { addTrack: addQueueList } = useQueue();

  const handleClick = () => {
    addPlayListTrack(data);
    addQueueList(data);
  };

  return (
    <li
      key={index}
      className="relative flex items-center w-full min-h-[50px] max-h-[45px]"
    >
      {/* COL-1 */}
      <div className="w-[45px] h-full grid place-items-center mr-4">
        <a className="font-semibold">{index + 1}.</a>
      </div>
      {/* COL-2 */}
      <Col>
        <a className="font-semibold">{data.trackTitle}</a>
        <TrackLISubA className="font-semibold text-xs">
          {data.artistName}•{convertTime(data.trackTime, "string")}
        </TrackLISubA>
      </Col>
      {/* COL-3 */}
      {isOwn ? (
        <div className="absolute items-center justify-center right-0 h-full space-x-1">
          <RippleButton
            className="relative p-2 rounded-full"
            clickHandler={handleClick}
          >
            <QueueList className="w-4 h-4" />
            <QueuePlayIconBox>
              <Play className="w-3 h-3" />
            </QueuePlayIconBox>
          </RippleButton>
          <RippleButton className="p-2 rounded-full">
            <DotMenu className="w-4 h-4" />
          </RippleButton>
        </div>
      ) : null}
    </li>
  );
};

export default TrackLiComponent;
