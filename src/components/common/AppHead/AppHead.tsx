import Head from "next/head";
import { FC } from "react";

import { SYMBOL_TEXT } from "constants/constants";

interface Props {
  title: string;
  children?: any;
}

const AppHead: FC<Props> = ({ title = SYMBOL_TEXT, children }) => {
  return (
    <Head>
      <title>{title}</title>
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
