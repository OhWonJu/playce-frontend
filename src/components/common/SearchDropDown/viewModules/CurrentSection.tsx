import React from "react";

import { SearchKeyword } from "@components/ui";
import { KeywordSearchKeyword } from "src/commonTypes/search";
import { Row } from "src/styles/GlobalStyle";
import useTheme from "@lib/client/hooks/useTheme";

interface CurrentSectionProps {
  autoKeyword: Array<KeywordSearchKeyword>;
}

const CurrentSection: React.FC<CurrentSectionProps> = ({ autoKeyword }) => {
  const theme = useTheme();
  return (
    <div className="flex flex-col h-full py-4">
      <Row className="w-full justify-between">
        <h2 className="font-semibold text-lg">Current Keywords</h2>
        <button
          className="text-xs font-semibold"
          style={{ color: theme.gray_primary }}
        >
          <a>전체 삭제</a>
        </button>
      </Row>
      <div className="flex-grow flex w-full pt-3 overflow-y-scroll scrollbar-hide">
        <ul className="w-full">
          {autoKeyword.map((v, i) => (
            <li key={i} className="w-full">
              <SearchKeyword
                keyword={v.keyword}
                keywordType={"KEYWORD"}
                isLog={true}
                clickHandler={() => console.log(v)}
                deletClickHandler={() => console.log("Delete")}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrentSection;
