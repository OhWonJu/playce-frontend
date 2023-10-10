import { Tag } from "@components/ui";
import React from "react";

const cardData = [
  "City Pop",
  "R&B",
  "Rock",
  "Pop",
  "Synth Pop",
  "KPop",
  "Drive Songs",
  "Alternative rock",
  "Jazz",
];

function RecommnedSection() {
  return (
    <div className="flex flex-col h-full py-4">
      <h2 className="font-semibold text-lg">Recommed Keywords</h2>
      <div className="flex flex-wrap pt-3 overflow-y-scroll scrollbar-hide">
        {cardData.map((v, i) => (
          <Tag key={i} context={v} />
        ))}
      </div>
    </div>
  );
}

export default RecommnedSection;
