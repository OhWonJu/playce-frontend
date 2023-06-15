import { useUI } from "@components/ui";
import {
  DESKTOP_PLAYER_WIDTH,
  NAV_HEIGHT,
  PLAYER_HEADER_HEIGHT,
} from "constants/constants";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import styled from "styled-components";

const Home: NextPage = () => {
  const { viewMode, openPlayer, closePlayer, displayPlayer } = useUI();

  const togglePlayerClickhandler = () => {
    if (displayPlayer) {
      closePlayer();
    } else {
      openPlayer();
    }
  };

  // console.log(displayPlayer);

  return (
    <Container isDesktop={viewMode === "DESKTOP" ? true : false}>
      <Wrapper>
        <div className="title">
          NEXTJS TYPESCRIPT STYLEDCOMPONENT BOILERPLATE. <br />
          {viewMode}
        </div>
        <div>
          <button onClick={() => togglePlayerClickhandler()}>
            {displayPlayer ? "CLOSE" : "OPEN"} Player
          </button>
        </div>
      </Wrapper>
      <Footer></Footer>
    </Container>
  );
};

const Container = styled.div<any>`
  width: 100%;
  ${props =>
    props.isDesktop && `max-width: calc(100vw - ${DESKTOP_PLAYER_WIDTH}px);`}
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${NAV_HEIGHT}px;
  padding-bottom: ${NAV_HEIGHT}px;
  ${props => props.isDesktop && `padding-left: ${DESKTOP_PLAYER_WIDTH}px;`}
  background-color: ${({ theme }) => theme.background__color};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 5;
  justify-content: center;
  align-items: center;
  .title {
    color: ${props => props.theme.text__color__primary};
    font-size: 2.5rem;
    font-weight: 900;
  }
`;
const Footer = styled.footer`
  display: flex;
  flex: 1;
  width: 100%;
`;

export default Home;
