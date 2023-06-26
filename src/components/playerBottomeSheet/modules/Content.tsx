import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import React from "react";

const Content = () => {
  const { currentTrack } = usePlayerControl();

  return (
    <div className="flex flex-col w-full">
      <section className="__RECO_TRACK__ flex flex-col max-w-full space-y-3 mb-8">
        <a className="font-bold text-lg">Recommend Tracks</a>
        <div className="flex max-w-full space-x-3 snap-mandatory snap-x overflow-x-scroll scrollbar-hide">
          <div className="flex flex-col min-w-[90%] space-y-2">
            <div className="w-full h-11 rounded-md bg-zinc-300" />
            <div className="w-full h-11 rounded-md bg-zinc-300" />
            <div className="w-full h-11 rounded-md bg-zinc-300" />
            <div className="w-full h-11 rounded-md bg-zinc-300" />
          </div>
          <div className="flex flex-col min-w-[90%] space-y-2">
            <div className="w-full h-11 rounded-md bg-zinc-300" />
            <div className="w-full h-11 rounded-md bg-zinc-300" />
            <div className="w-full h-11 rounded-md bg-zinc-300" />
            <div className="w-full h-11 rounded-md bg-zinc-300" />
          </div>
        </div>
      </section>

      <section className="__OTHER_ALBUM__ flex flex-col max-w-full space-y-3 mb-8">
        <a className="font-bold text-lg">
          {currentTrack.artistKo}'s Other Albums
        </a>
        <div className="flex max-w-full space-x-3 snap-mandatory snap-x overflow-x-scroll scrollbar-hide">
          <div className="min-w-[150px] min-h-[150px] rounded-lg bg-zinc-300" />
          <div className="min-w-[150px] min-h-[150px] rounded-lg bg-zinc-300" />
          <div className="min-w-[150px] min-h-[150px] rounded-lg bg-zinc-300" />
          <div className="min-w-[150px] min-h-[150px] rounded-lg bg-zinc-300" />
          <div className="min-w-[150px] min-h-[150px] rounded-lg bg-zinc-300" />
        </div>
      </section>

      <section className="__SIM_ARTIST__ flex flex-col max-w-full space-y-3 mb-8">
        <a className="font-bold text-lg">Similer Artists</a>
        <div className="flex max-w-full space-x-3 snap-mandatory snap-x overflow-x-scroll scrollbar-hide">
          <div className="min-w-[150px] min-h-[150px] rounded-full bg-zinc-300" />
          <div className="min-w-[150px] min-h-[150px] rounded-full bg-zinc-300" />
          <div className="min-w-[150px] min-h-[150px] rounded-full bg-zinc-300" />
          <div className="min-w-[150px] min-h-[150px] rounded-full bg-zinc-300" />
          <div className="min-w-[150px] min-h-[150px] rounded-full bg-zinc-300" />
        </div>
      </section>

      <section className="__ABOUT__ flex flex-col max-w-full space-y-3">
        <a className="font-bold text-lg">
          Magazines, tell about {currentTrack.trackTitle}
        </a>
        <div className="flex max-w-full space-x-3 snap-mandatory snap-x overflow-x-scroll scrollbar-hide">
          <div className="min-w-[150px] min-h-[150px] rounded-lg bg-zinc-300" />
          <div className="min-w-[150px] min-h-[150px] rounded-lg bg-zinc-300" />
          <div className="min-w-[150px] min-h-[150px] rounded-lg bg-zinc-300" />
          <div className="min-w-[150px] min-h-[150px] rounded-lg bg-zinc-300" />
        </div>
      </section>
    </div>
  );
};

export default Content;
