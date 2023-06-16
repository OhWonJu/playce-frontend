import { NAV_HEIGHT, PLAYER_HEADER_HEIGHT } from "constants/constants";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

export const PlayerHeader = styled(motion.div)`
  /* max-height: ${PLAYER_HEADER_HEIGHT}px; */
  /* ${tw`relative w-full flex justify-end items-center px-2`} */
  ${tw`relative w-full h-full flex justify-end items-center px-2`}
`;

export const PlayerBody = styled(motion.div)`
  ${tw`w-full h-full flex flex-col items-center`}
`;

export const AlbumArea = styled.div`
  ${tw`flex w-full h-[52%] overflow-hidden`}
`;

export const Album = styled(motion.div)<any>`
  max-height: 100%;
  ${tw`max-w-full mx-auto`}
`;

export const PlayerMicroCtlr = styled(motion.div)`
  height: ${PLAYER_HEADER_HEIGHT}px;
  ${tw`flex items-center justify-between`}
`;

export const PlayerCtlrArea = styled(motion.div)`
  max-height: 100%;
  ${tw`relative flex flex-col w-full items-center px-8`}
`;

export const PlayerFooter = styled(motion.div)`
  height: 20%;
  max-height: ${NAV_HEIGHT + PLAYER_HEADER_HEIGHT}px;
`;
