import React from "react";
import { useRouter } from "next/router";

import { Button, Container, useUI } from "@components/ui";
import { AppSubText, AppTitle } from "./Welcome.styles";

const WelcomeView = () => {
  const router = useRouter();

  const { setModalView, openModal } = useUI();

  return (
    <Container
      containPlayer={false}
      className="h-screen w-full justify-start items-center"
    >
      <div className="flex flex-col h-full w-full sm:max-w-[450px] justify-start items-center px-4 sm:px-10 overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col h-[70%] pb-[30%] justify-center items-center">
          <AppTitle>PLAYCE</AppTitle>
          <AppSubText className="font-semibold text-lg">
            connect your pysical albums
          </AppSubText>
        </div>
        <div className="flex flex-col h-[30%] w-full justify-start items-center space-y-4">
          <Button
            variant="flat"
            type="button"
            onClick={() => {
              setModalView("LOGIN_VIEW");
              openModal();
            }}
          >
            <span>Log In</span>
          </Button>
          <Button
            variant="naked"
            type="button"
            onClick={() => router.push("/join")}
          >
          <p>Sign Up</p>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default WelcomeView;
