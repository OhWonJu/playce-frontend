import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import tw from "twin.macro";

import { DESKTOP_PLAYER_WIDTH, NAV_HEIGHT } from "constants/constants";
import { useUI } from "../context";

interface ContainerProps {
  children?: any;
  className?: string;
  containPlayer?: boolean;
  [key: string]: any;
}

const Container: FC<ContainerProps> = ({
  children,
  className,
  containPlayer = true,
  ...rest
}) => {
  const { viewMode, closePlayer } = useUI();

  useEffect(() => {
    if (!containPlayer) closePlayer();
  }, [containPlayer]);

  return (
    <>
      {containPlayer ? (
        <ContainPlayerWrapper
          className={className}
          isDesktop={viewMode === "DESKTOP" ? true : false}
          {...rest}
        >
          {children}
        </ContainPlayerWrapper>
      ) : (
        <Wrapper
          className={className}
          isDesktop={viewMode === "DESKTOP" ? true : false}
          {...rest}
        >
          {children}
        </Wrapper>
      )}
    </>
  );
};

export default Container;

const ContainPlayerWrapper = styled.div<any>`
  position: relative;
  width: 100%;
  /* ${props =>
    props.isDesktop &&
    `max-width: calc(100vw - ${DESKTOP_PLAYER_WIDTH * 2}px);`} */
  max-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: ${props => (props.isDesktop ? NAV_HEIGHT * 2 : NAV_HEIGHT)}px;
  padding-bottom: ${NAV_HEIGHT}px;
  /* ${props => props.isDesktop && `margin-left: ${DESKTOP_PLAYER_WIDTH}px;`} */
  ${props => props.isDesktop && `padding-left: ${DESKTOP_PLAYER_WIDTH + 16}px;`}
  ${props =>
    props.isDesktop && `padding-right: ${DESKTOP_PLAYER_WIDTH + 16}px;`}
  
  background-color: ${({ theme }) => theme.background__color};

  ${props => {
    if (!props.isDesktop) {
      return css`
        ${tw`pl-4 pr-4 md:pl-6 md:pr-6`}
      `;
    }
  }}
`;

const Wrapper = styled.div<any>`
  position: relative;
  width: 100%;
  /* max-width: 800px; */
  display: flex;
  flex-direction: column;
  padding-top: ${props => (props.isDesktop ? NAV_HEIGHT * 2 : NAV_HEIGHT)}px;
  padding-bottom: ${NAV_HEIGHT}px;
  /* padding-left: ${DESKTOP_PLAYER_WIDTH}px; */
  /* padding-right: ${DESKTOP_PLAYER_WIDTH}px; */
  margin: auto;
  background-color: ${props => props.theme.background_color};

  ${tw`lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1200px]`}
  ${tw`pl-4 pr-4 md:pl-5 md:pr-5`}
`;
