import React from "react";
import { SYMBOL_TEXT } from "@lib/client/constants/uiStandard";
import styled from "styled-components";
import tw from "twin.macro";

export default function Header() {
  return (
    <Wrapper>
      <div>
        <H1>{SYMBOL_TEXT}</H1>
      </div>
      <div>
        <H3>connect your pysical albums</H3>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${tw`flex flex-col items-center pb-10`}
`;

const H1 = styled.h1`
  ${tw`font-extrabold text-7xl mb-3`}
`;

const H3 = styled.h3`
  ${tw`font-semibold`}
`;
