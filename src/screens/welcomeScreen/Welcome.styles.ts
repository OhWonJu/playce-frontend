import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

const animation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px)
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const AppTitle = styled.h1`
  opacity: 0;
  animation: ${animation} 1000ms ease-out 1;
  animation-delay: 500ms;
  animation-fill-mode: forwards;
  ${tw`font-extrabold text-7xl mb-3`}
`;

export const AppSubText = styled.a`
  opacity: 0;
  animation: ${animation} 800ms ease-out 1;
  animation-delay: 800ms;
  animation-fill-mode: forwards;
  ${tw`font-semibold`}
`;
