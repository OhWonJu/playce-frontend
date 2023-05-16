import { useEffect, useMemo, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import wrapper from "@lib/client/store/store";
import AppHead from "@components/common/AppHead";
import Layout from "@components/common/Layout";
import { ManagedUIContext } from "@components/ui/context";

import { SYMBOL_TEXT } from "constants/constants";
import { GlobalStyle } from "src/styles/GlobalStyle";
import "../styles/tailwind.css";

/**
 * Redux wrapper Issue
 */
// function App({ Component, pageProps }: AppProps) {
//   const router = useRouter();

//   const [title, setTitle] = useState<string>(SYMBOL_TEXT);

//   useEffect(() => {
//     const path = router.pathname.split("/")[1];
//     if (path) setTitle(path + " | " + SYMBOL_TEXT);
//     return;
//   }, [router]);

//   return (
//     <>
//       <AppHead title={title} />
//       <ManagedUIContext>
//         <GlobalStyle />
//         <Layout pageProps={pageProps} path={router.pathname}>
//           <Component {...pageProps} />
//         </Layout>
//       </ManagedUIContext>
//     </>
//   );
// }
// export default wrapper.withRedux(App);

const queryClient = new QueryClient();

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  const router = useRouter();

  const title = useMemo(() => {
    const path = router.pathname.split("/")[1];
    if (path) return path + " | " + SYMBOL_TEXT;
  }, [router]);

  return (
    <>
      <AppHead title={title} />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ManagedUIContext>
            <GlobalStyle />
            <Layout
              id="root-layout"
              pageProps={pageProps}
              path={router.pathname}
            >
              <Component {...pageProps} />
            </Layout>
          </ManagedUIContext>
        </Provider>
        {/* Dev */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
