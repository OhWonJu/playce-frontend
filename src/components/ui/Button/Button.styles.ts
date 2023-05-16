import styled from "styled-components";
import tw from "twin.macro";

export const Flat = styled.button<any>`
  width: 100%;
  background-color: ${props => props.theme.gray_primary};
  & > span {
    color: ${props => props.theme.text_secondary_color};
  }
  &:hover {
    background-color: ${props => props.theme.black_primary};
  }
  ${tw`transition duration-100`}
`;

export const Naked = styled.button<any>`
  width: 100%;
  color: ${props => props.theme.text_primary_color};
  ${tw`flex justify-center items-center shadow hover:shadow-inner transition-shadow`}
`;

export const Disabled = styled.button`
  width: 100%;
  background-color: ${props => props.theme.gray_primary};
  & > span {
    color: ${props => props.theme.text_secondary_color};
  }
`;
