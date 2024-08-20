import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import tw from "twin.macro";

export const GlobalStyle = createGlobalStyle<any>`
    ${normalize}

    *{
        color: ${props => props.theme.text_primary_color};
        font-family: sans-serif;
    }
    body {
        min-width: 420px;
        background-color: ${props => props.theme.background_color};
        background-repeat: repeat;
    }

    html,
    body {
      height: 100%;
      box-sizing: border-box;
      touch-action: manipulation;
      /* font-family: var(--font-sans); */
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      /* background-color: var(--primary); */
      /* color: var(--text-primary); */
      overscroll-behavior-x: none;
    }

    body {
      position: relative;
      min-height: 100%;
      margin: 0;
    }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SymbolText = styled.span`
  ${tw`font-extrabold text-6xl`}
`;

export const SectionHeaderText = styled.span`
  ${tw`text-4xl font-bold`}
`;
