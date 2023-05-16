import { useUI } from "@components/ui";
import { NAV_HEIGHT } from "constants/constants";
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
    <Container>
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

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${NAV_HEIGHT}px;
  padding-bottom: ${NAV_HEIGHT}px;
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
