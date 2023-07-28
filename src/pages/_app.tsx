import { useEffect, useMemo, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import wrapper from "@lib/client/store/store";
import AppHead from "@components/common/AppHead";
import Layout from "@components/common/Layout";
import { ManagedUIContext } from "@components/ui/context";

import { GlobalStyle } from "src/styles/GlobalStyle";
import "../styles/tailwind.css";
import { useLocalStorage } from "@lib/client/hooks/useLocalStorage";
import { useAuth } from "@lib/client/hooks/useAuth";
import { API } from "@lib/server/rootAPI";
import { useMe } from "@lib/client/hooks/useMe";
import { _ME } from "@lib/server/api/user/me";
import useEventQuery from "@lib/client/hooks/useEventQuery";

const queryClient = new QueryClient();

function App({ Component, pageProps, ...rest }: AppProps) {
  const router = useRouter();

  const [token, setToken] = useLocalStorage("token");
  const { isLogIn, setAuth } = useAuth();
  const { setMe } = useMe();

  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["me"],
  //   queryFn: async () => await _ME(),
  //   enabled: token !== null && id === null, // 기본 데이터가 셋 되면 다시 호출될 필요가 없거등요.. (재호출이 필요한 경우는, 로그아웃-재로그인)
  //   onSuccess: data => {
  //     if (data) {
  //       // console.log(data);
  //       setMe({
  //         id: data.id,
  //         profilePhoto: data.profilePhoto,
  //         userName: data.userName,
  //       });
  //     }
  //   },
  //   retry: false,
  //   refetchOnWindowFocus: false,
  // });

  const { isLoading, refetch } = useEventQuery({
    key: "me",
    endPoint: "api/users/me",
  });

  // const onFinish = () => setTimeout(() => {}, 1000);

  const preload = async () => {
    if (token != null) {
      API.defaults.headers.common["Authorization"] = "Bearer " + token;
      const data = (await refetch()).data?.data ?? null;

      if (!data) {
        setAuth({ isLogIn: false, token: null });
        setToken(null);

        // useEffect 내에서는 여러번 push 가 일어남.
        // 참고 - https://velog.io/@a_in/Next.js-Error-Abort-fetching-for-route
        router.push("/", undefined, { shallow: true });
      } else {
        setMe({
          id: data.id,
          profilePhoto: data.profilePhoto,
          userName: data.userName,
        });
        // 토큰 값을 redux에도 저장해서. 매번 Storage에서 get하지 않도록.
        setAuth({ isLogIn: true, token: token });
        if (router.asPath === "/")
          router.push("/home", undefined, { shallow: true });
      }
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        preload();
      } catch (e) {
        console.warn(e);
      } finally {
        // onFinish();
      }
    };
    prepare();
  }, [isLogIn, token]);

  // const title = useMemo(() => {
  //   const path = router.pathname.split("/")[1];
  //   if (path && path !== "home") return SYMBOL_TEXT + " | " + path;
  // }, [router]);

  // if (isLoading) return null;

  return (
    <>
      <AppHead />
      <ManagedUIContext>
        <GlobalStyle />
        <Layout id="root-layout" pageProps={pageProps} path={router.pathname}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
      {/* Dev */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

export default function AppWrapper({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App pageProps={pageProps} Component={Component} {...rest} />
      </Provider>
    </QueryClientProvider>
  );
}
