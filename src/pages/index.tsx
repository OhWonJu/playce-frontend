import { useUI } from "@components/ui";
import useTheme from "@lib/client/hooks/useTheme";
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
  const theme = useTheme();
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
    <Container
      isDesktop={viewMode === "DESKTOP" ? true : false}
      className="overflow-y-scroll scrollbar-hide"
    >
      <Wrapper>
        <div className="flex flex-col pb-5">
          <a className="title ">PLAYCE {viewMode}</a>
          <a className="font-semibold text-lg">connect your pysical albums</a>
        </div>

        {/*  */}
        <div className="pb-5">
          <button onClick={() => togglePlayerClickhandler()}>
            {displayPlayer ? "CLOSE" : "OPEN"} Player
          </button>
        </div>

        {/*  */}
        <div className="__MY_ALBUM__ w-full pb-10">
          <div className="flex w-full justify-between pb-3">
            <a className="font-bold text-2xl">MY ALBUM</a>
            <div
              className="font-semibold text-xs text-center px-1.5 py-1 rounded-full"
              style={{ borderWidth: 1 }}
            >
              <a className="">more</a>
            </div>
          </div>
          <div className="flex flex-col flex-wrap w-full max-h-[350px] snap-mandatory snap-x overflow-x-scroll scrollbar-hide gap-2">
            {Array.from({ length: 12 }, () => 0).map((arr, index) => (
              <div
                key={index}
                className="flex flex-col min-w-[120px] min-h-[170px] snap-center"
              >
                <div className="w-[120px] h-[120px] rounded-md snap-center mb-1 bg-zinc-500" />
                <div className="flex flex-col">
                  <a className="font-bold">Title</a>
                  <a className="font-semibold text-sm">artist</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*  */}
        <div className="__MY_PLAY_LIST__ w-full pb-10">
          <div className="flex w-full justify-between pb-3">
            <a className="font-bold text-2xl">MY PLAY LIST</a>
            <div
              className="font-semibold text-xs text-center px-1.5 py-1 rounded-full"
              style={{ borderWidth: 1 }}
            >
              <a className="">more</a>
            </div>
          </div>
          <div className="flex flex-col flex-wrap w-full max-h-[310px] snap-mandatory snap-x overflow-x-scroll scrollbar-hide gap-2">
            {Array.from({ length: 12 }, () => 0).map((arr, index) => (
              <div
                key={index}
                className="flex flex-col min-w-[120px] min-h-[150px] snap-center"
              >
                <div className="w-[120px] h-[120px] rounded-md snap-center mb-1 bg-zinc-500" />
                <div className="flex flex-col">
                  <a className="font-semibold text-sm">Title</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*  */}
        <div
          className="__RECOMMEND__ w-full"
          style={{ paddingBottom: PLAYER_HEADER_HEIGHT }}
        >
          <div className="flex w-full justify-between pb-3">
            <a className="font-bold text-2xl">Recommend</a>
            <div
              className="font-semibold text-xs text-center px-1.5 py-1 rounded-full"
              style={{ borderWidth: 1 }}
            >
              <a className="">more</a>
            </div>
          </div>
          <div className="flex flex-col flex-wrap w-full max-h-[350px] snap-mandatory snap-x overflow-x-scroll scrollbar-hide gap-2">
            {Array.from({ length: 12 }, () => 0).map((arr, index) => (
              <div
                key={index}
                className="flex flex-col min-w-[120px] min-h-[170px] snap-center"
              >
                <div className="w-[120px] h-[120px] rounded-md snap-center mb-1 bg-zinc-500" />
                <div className="flex flex-col">
                  <a className="font-bold">Title</a>
                  <a className="font-semibold text-sm">artist</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div<any>`
  position: relative;
  width: 100%;
  ${props =>
    props.isDesktop && `max-width: calc(100vw - ${DESKTOP_PLAYER_WIDTH}px);`}
  max-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  padding-top: ${NAV_HEIGHT}px;
  padding-bottom: ${NAV_HEIGHT}px;
  ${props => props.isDesktop && `padding-left: ${DESKTOP_PLAYER_WIDTH}px;`}
  background-color: ${({ theme }) => theme.background__color};
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 1rem 1rem;
  /* justify-content: center; */
  /* align-items: center; */
  .title {
    color: ${props => props.theme.text__color__primary};
    font-size: 2.5rem;
    font-weight: 900;
  }
`;

export default Home;
