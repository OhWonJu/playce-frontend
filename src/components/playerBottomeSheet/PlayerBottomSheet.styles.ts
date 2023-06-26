import {
  NAV_HEIGHT,
  PLAYER_BOTTOM_SHEET_HEADER_HEIGHT,
} from "constants/constants";
import styled from "styled-components";
import tw from "twin.macro";

export const PBSHandleWrapper = styled.section`
  width: 100%;
  height: ${PLAYER_BOTTOM_SHEET_HEADER_HEIGHT}px;

  ${tw`relative grid place-items-center`}
`;

export const PBSHandle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: ${props => props.theme.gray_light + 60};

  ${tw`shadow-inner`}
`;

export const PBSHeaderWrapper = styled.section`
  width: 100%;
  height: ${NAV_HEIGHT}px;

  ${tw`fixed  px-4`};
`;

export const PBSHeader = styled.div`
  border-bottom-width: 1.5px;
  border-color: ${props => props.theme.gray_light + 80};

  ${tw`w-full h-full flex justify-between items-center`}
`;

export const PBSHeaderTabs = styled.div`
  ${tw`grid place-items-center w-[25%] h-full`}
`;

export const PBSHeaderA = styled.a<any>`
  color: ${props =>
    props.focused ? props.theme.text_primary_color : props.theme.gray_primary};

  ${tw`text-sm font-bold`};
`;

export const PBSContentWrapper = styled.section`
  background-color: ${props => props.theme.background_color};

  ${tw`flex flex-col w-full h-[87%] pt-4 pb-4 px-4 space-y-3 overflow-y-scroll scrollbar-hide z-[100]`}
`;
