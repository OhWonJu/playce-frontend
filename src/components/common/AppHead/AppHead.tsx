import Head from "next/head";
import Image from "next/image";
import { FC } from "react";

import { SYMBOL_TEXT } from "@lib/client/constants/uiStandard";
import { usePlayerControl } from "@lib/client/hooks/usePlayerControl";
import { useUI } from "@components/ui";

interface Props {
  title?: string;
  children?: any;
}

const AppHead: FC<Props> = ({ title = SYMBOL_TEXT, children }) => {
  const { displayPlayer } = useUI();
  const { currentTrack, play } = usePlayerControl();

  return (
    <Head>
      {/* FAVICON CHANGE ... */}
      <title>
        {displayPlayer && currentTrack && play
          ? `${currentTrack.trackTitle}`
          : title}
      </title>
      <meta name="description" content="PLAYCE" />
      {/* FONT */}
      {/* <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      /> */}
      {children}
    </Head>
  );
};

export default AppHead;
