import { ALBUM_CARD_HEIGHT, ALBUM_CARD_WIDTH } from "@lib/client/constants/uiStandard";
import styled from "styled-components";
import tw from "twin.macro";

export const AlbumCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: ${ALBUM_CARD_HEIGHT}px;
  width: ${ALBUM_CARD_WIDTH}px;
  overflow: hidden;
`;

export const AlbumArtWrapper = styled.div`
  position: relative;
  height: ${ALBUM_CARD_WIDTH}px;
  width: ${ALBUM_CARD_WIDTH}px;

  ${tw`rounded-md overflow-hidden mb-1`}
`;
