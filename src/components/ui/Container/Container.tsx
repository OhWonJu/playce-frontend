import React, { FC } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
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
  const { viewMode } = useUI();

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
  ${props =>
    props.isDesktop &&
    `max-width: calc(100vw - ${DESKTOP_PLAYER_WIDTH * 2}px);`}
  max-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  padding-top: ${props => (props.isDesktop ? NAV_HEIGHT * 2 : NAV_HEIGHT)}px;
  padding-bottom: ${NAV_HEIGHT}px;
  ${props => props.isDesktop && `margin-left: ${DESKTOP_PLAYER_WIDTH}px;`}
  background-color: ${({ theme }) => theme.background__color};

  ${tw`pl-4 pr-4 md:pl-5 md:pr-5`}
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

  ${tw`lg:max-w-[800px] xl:max-w-[1000px]  2xl:max-w-[1200px]`}
  ${tw`pl-4 pr-4 md:pl-5 md:pr-5`}
`;
