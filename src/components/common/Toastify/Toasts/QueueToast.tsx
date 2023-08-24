import React from "react";
import { toast } from "react-toastify";

import { Track } from "@lib/client/types";
import { EllipsisText } from "@components/ui";

interface QueueToastProps {
  track: Track;
  isInQueue: boolean;
}

const QueueToast: React.FC<QueueToastProps> = ({ track, isInQueue }) => {
  const Notic = () => (
    <a className="font-extrabold text-xs">
      {isInQueue ? "큐에 추가됨" : "큐에서 제거됨"}
    </a>
  );

  return (
    <div className="flex flex-col max-w-full h-full">
      <section>
        <Notic />
      </section>
      <section>
        <EllipsisText
          context={`${track.artistName} - ${track.trackTitle}`}
          lineClamp={1}
          className="font-semibold text-sm"
        />
      </section>
    </div>
  );
};

const Toast = ({ track, isInQueue }: QueueToastProps) =>
  toast(<QueueToast track={track} isInQueue={isInQueue} />);

export default Toast;
