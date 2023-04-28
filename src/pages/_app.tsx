import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import styled, { ThemeProvider } from "styled-components";

import { GlobalStyle } from "src/styles/GlobalStyle";
import { lightTheme, darkTheme } from "src/styles/theme";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  // const [mode, setMode] = useState("light");
  const [mode, setMode] = useState("");

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem("theme");
    if (theme) {
      setMode(theme);
    } else {
      setMode(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    }
  }, []);

  // useEffect(() => {
  //   window.localStorage.setItem(
  //     "theme",
  //     `${mode === "dark" ? "dark" : "light"}`,
  //   );
  //   if (window.localStorage.getItem("theme") === "dark") {
  //     setMode("dark");
  //   } else if (window.localStorage.getItem("welcoming-theme") === "light") {
  //     setMode("light");
  //   }
  // }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode(m => (m === "light" ? "dark" : "light"));
  }, [mode]);

  console.log(mode);

  return (
    <>
      <Head>
        <title>NEXTJS BOILERPLATE</title>
        <meta name="description" content="NEXTJS BOILERPLATE" />
      </Head>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
