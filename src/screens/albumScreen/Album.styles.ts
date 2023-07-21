import styled from "styled-components";
import tw from "twin.macro";

export const AlbumInfoWrapper = styled.section`
  position: relative;
  display: flex;
  width: 100%;

  ${tw`flex-col mb-4`}
  ${tw`sm:flex-row sm:h-[250px] sm:space-x-6`}
  ${tw`lg:flex-col lg:h-full lg:space-x-0`}
  ${tw`xl:flex-row xl:h-[250px] xl:space-x-6`}
`;

export const AlbumArt = styled.div`
  position: relative;
  display: flex;
  min-height: 250px;
  min-width: 250px;
  aspect-ratio: 1/1;
  overflow: hidden;

  ${tw`rounded-md shadow-sm mb-2 sm:mb-0`}
`;

export const AlbumUtils = styled.div`
  ${tw`grid grid-rows-4`}
`;

export const AlbumInfo = styled.section`
  display: flex;
  flex-direction: column;

  ${tw`row-start-1 row-span-3 sm:justify-center mb-4 sm:mb-0`}
`;

export const AlbumButton = styled.section`
  ${tw`row-start-4 row-span-1  sm:pt-3 lg:pt-1 xl:pt-3`}
`;
