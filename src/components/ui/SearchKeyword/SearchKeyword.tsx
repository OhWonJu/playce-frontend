import React from "react";

import { SEARCH_KEYWORD_TYPE } from "constants/search";
import { Col, Row } from "src/styles/GlobalStyle";
import { EllipsisText } from "@components/ui";
import { Cross, Search } from "@components/icons";
import useTheme from "@lib/client/hooks/useTheme";

interface SearchKeyWordProps {
  thumbnail?: string;
  keyword: string;
  keywordType?: "ARTIST" | "ALBUM" | "TRACK" | "KEYWORD";
  tags?: Array<string>;
  isLog?: boolean;
  clickHandler?: Function;
  deletClickHandler?: Function;
}

const SearchKeyword: React.FC<SearchKeyWordProps> = ({
  thumbnail = null,
  keyword,
  keywordType = "KEYWORD",
  tags,
  isLog = false,
  clickHandler,
  deletClickHandler,
}) => {
  const theme = useTheme();

  return (
    <Row className="w-full h-10 mb-6 items-center justify-between space-x-2">
      <Row
        onClick={() => clickHandler()}
        className="w-full h-full items-center justify-between space-x-2"
      >
        <div className="__THUMB__ w-10 aspect-square">
          <div className="__IMAGE_WRAPPER__ flex items-center w-full h-full rounded-full overflow-hidden">
            {thumbnail ? (
              <div className="w-full h-full  bg-gray-400" />
            ) : (
              <Search className="h-5 w-5 m-auto" />
            )}
          </div>
        </div>
        <Col className="__CONTEXT__ flex-grow h-full justify-center">
          <Row className="items-center space-x-1">
            <EllipsisText
              context={keyword}
              lineClamp={1}
              className="text-base font-bold"
            />
            {keywordType !== "KEYWORD" && (
              <a
                className="_KEYWORD_TYPE__ text-xs font-bold"
                style={{
                  color: theme.gray_primary,
                }}
              >
                {SEARCH_KEYWORD_TYPE[keywordType]}
              </a>
            )}
          </Row>
          {tags && (
            <div
              className="__BRAND_TAG__ text-[10px] font-semibold space-x-1"
              style={{
                color: theme.gray_primary,
              }}
            >
              {tags.map((tag, index) => (
                <React.Fragment key={index}>
                  <a key={index}>{tag}</a>
                  {index !== tags.length - 1 && <a>/</a>}
                </React.Fragment>
              ))}
            </div>
          )}
        </Col>
      </Row>
      {isLog && (
        <div className="__UTILS__ flex h-full items-center">
          <button
            className="bg-black bg-opacity-10 hover:bg-opacity-30 p-1 rounded-full"
            onClick={() => deletClickHandler()}
            type="button"
          >
            <Cross
              className="h-3 w-3"
              strokeWidth={2}
              stroke={theme.white_primary}
            />
          </button>
        </div>
      )}
    </Row>
  );
};

export default SearchKeyword;
