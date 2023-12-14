import {
  BORDER_TINE_WIDTH,
  CONTAINER_PADDING_HORIZONTAIL,
  NAV_HEIGHT,
} from "constants/constants";
import styled, { css, keyframes } from "styled-components";
import tw from "twin.macro";

// SearchDropDownView ==================================== //
export const DropDownWrapper = styled.div`
  ${tw`relative flex flex-col w-full h-full`}
`;

export const Desktop = styled.div<any>`
  max-height: calc(100% - ${NAV_HEIGHT}px);
  ${tw`flex flex-row`}
`;

export const Mobile = styled.div<any>`
  padding: 0rem ${CONTAINER_PADDING_HORIZONTAIL};
  max-height: calc(100% - ${NAV_HEIGHT}px);
  ${tw`flex flex-col`}
`;

export const Span = styled.span<any>`
  ${tw`font-medium block`};
  color: ${props => props.theme.gray_primary};
  :hover {
    color: ${props => props.theme.text_primary_color};
  }
`;
// ==================================== SearchDropDownView //

// Sections ============================================== //
export const Ul = styled.ul`
  border-bottom-width: ${BORDER_TINE_WIDTH}px;
  border-color: ${props => props.theme.gray_light};
  margin-bottom: 1rem;
`;
// ============================================== Sections //
