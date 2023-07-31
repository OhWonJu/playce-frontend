import React, { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";
import { FieldErrors, useForm } from "react-hook-form";

import { SCREEN_SIZE_MD } from "constants/constants";

import { artist, curr, album, track } from "./SearchDropDownModel";
import SearchDropDownView from "./SearchDropDownView";
import { AutoKeywordSection, CurrentSection, Searchbar } from "./viewModules";
import InputModeStore from "@lib/client/store/simpleStore/inputModeSotre";

export interface SearchProps {
  keyword: string;
}

interface SearchDropDownProps {
  onClose?: () => void;
}

const SearchDropDownController: React.FC<SearchDropDownProps> = ({
  onClose,
}) => {
  const { setInputMode } = InputModeStore();

  const { width: windowWidth } = useWindowSize();
  const [inputFocused, setInputFocused] = useState(false);
  const [showRecommend, setShowRecommend] = useState(true);

  // UI Controlls ================================================================= //
  const viewMode = useMemo(
    () => (windowWidth && windowWidth < SCREEN_SIZE_MD ? "MOBILE" : "DESKTOP"),
    [windowWidth],
  );

  const _focusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    // const currentField = event.target.name;
    // if (currentField === "keyword") setInputFocused(true);
    // console.log(`Focused field: ${currentField}`);
    if (event.target.name) {
      setInputFocused(true);
      setShowRecommend(false);
    }
  };
  const _blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.name) setInputFocused(false);
  };
  // ================================================================= UI Controlls //

  // Data fetching ================================================================ //
  const getCurrentKeyword = () => curr;
  const getAutoArtistKeyword = () => artist;
  const getAutoAlbumKeyword = () => album;
  const getAutoTrackKeyword = () => track;
  const getAutoKeyword = () => curr;
  // ================================================================ Data fetching //

  // React Hook Form ============================================================= //
  const { register, handleSubmit, watch, setValue, setFocus } =
    useForm<SearchProps>({
      mode: "onChange",
    });

  useEffect(() => {
    if (windowWidth && viewMode === "DESKTOP") {
      setTimeout(() => {
        setFocus("keyword");
        setInputFocused(true);
      }, 1);
    }
  }, [setFocus, viewMode, windowWidth]);

  const onSubmit = (data: SearchProps) => {
    console.log(data);
  };
  const onInvaild = (errors: FieldErrors) => {
    console.log(errors);
  };

  const _clearHandler = () => {
    setValue("keyword", "");
    setFocus("keyword");
  };
  // =========================================================== React Hook Form //

  // 키보드 입력이 필요한 경우 기존의 space(재생정지) 이벤트를 중단 시키기 위해 전역 state 변경
  useEffect(() => {
    setInputMode(true);
    return () => setInputMode(false);
  }, []);

  const SEARCH_BAR = (
    <Searchbar
      register={register}
      handleSubmit={handleSubmit}
      watch={watch}
      clearHandler={_clearHandler}
      onSubmit={onSubmit}
      onInvaild={onInvaild}
      handleFocus={_focusHandler}
      handleBlur={_blurHandler}
    />
  );

  const CURRENT_SECTION = <CurrentSection autoKeyword={getCurrentKeyword()} />;

  const AUTO_SECTION = (
    <AutoKeywordSection
      autoArtist={getAutoArtistKeyword()}
      autoAlbum={getAutoAlbumKeyword()}
      autoTrack={getAutoTrackKeyword()}
      autoKeyword={getAutoKeyword()}
    />
  );

  return (
    <SearchDropDownView
      onClose={onClose}
      viewMode={viewMode}
      watch={watch}
      inputFocused={inputFocused}
      showRecommend={showRecommend}
      getCurrentKeyword={getCurrentKeyword}
      SEARCH_BAR={SEARCH_BAR}
      CURRENT_SECTION={CURRENT_SECTION}
      AUTO_SECTION={AUTO_SECTION}
    />
  );
};

export default SearchDropDownController;
