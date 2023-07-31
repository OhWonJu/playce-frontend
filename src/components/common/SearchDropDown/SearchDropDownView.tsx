import React, { useState } from "react";
import { UseFormWatch } from "react-hook-form";

import DropDown from "@components/ui/DropDown";

import { SearchProps } from "./SearchDropDownController";
import { RecommnedSection } from "./viewModules";
import { Desktop, DropDownWrapper, Mobile } from "./SearchDropDown.styles";

interface SearchDropDownViewProps {
  onClose?: () => void;
  viewMode: "MOBILE" | "DESKTOP";
  watch: UseFormWatch<SearchProps>;
  inputFocused: boolean;
  showRecommend: boolean;
  getCurrentKeyword: Function;
  SEARCH_BAR: JSX.Element;
  CURRENT_SECTION: JSX.Element;
  AUTO_SECTION: JSX.Element;
}

const SearchDropDownView: React.FC<SearchDropDownViewProps> = ({
  onClose,
  viewMode,
  inputFocused,
  showRecommend,
  watch,
  SEARCH_BAR,
  CURRENT_SECTION,
  AUTO_SECTION,
}) => {
  return (
    <DropDown onClose={onClose} navCover={true} activateCloseKeyAction={true}>
      <DropDownWrapper className="">
        <div>{SEARCH_BAR}</div>
        {viewMode === "DESKTOP" ? (
          <Desktop className="">
            <div className="__CURRENT__ flex-1 md:ml-[10%] lg:ml-[15%] pr-5">
              {watch("keyword") && watch("keyword")?.length > 0 ? (
                <>{AUTO_SECTION}</>
              ) : (
                <>{CURRENT_SECTION}</>
              )}
            </div>
            <div className="__RECOMMED__ flex-1 h-full md:mr-[10%] lg:mr-[15%] pl-5">
              <RecommnedSection />
            </div>
          </Desktop>
        ) : (
          <Mobile>
            {!showRecommend && watch("keyword").length < 1 && (
              <>{CURRENT_SECTION}</>
            )}
            {watch("keyword") && watch("keyword").length > 0 && <>{AUTO_SECTION}</>}
            {showRecommend && <RecommnedSection />}
          </Mobile>
        )}
      </DropDownWrapper>
    </DropDown>
  );
};

export default SearchDropDownView;
