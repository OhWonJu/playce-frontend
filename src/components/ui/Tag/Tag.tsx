import React, { useEffect, useState } from "react";
import cn from "clsx";
import styled, { css } from "styled-components";
import tw from "twin.macro";

interface TagProps {
  context: string;
  className?: string;
  onClick?: Function;
  selected?: boolean;
  [key: string]: any;
}

const Tag: React.FC<TagProps> = ({
  context,
  className,
  onClick = (): any => null,
  selected = false,
  ...rest
}) => {
  const [pressed, setPressed] = useState<boolean>(selected);

  useEffect(() => {
    setPressed(selected);
  }, [selected]);

  const rootClassName = cn(
    "p-3 mr-2 mb-2 flex rounded-full items-center",
    {},
    className,
  );

  return (
    <CardBtn
      className={rootClassName}
      pressed={pressed}
      onClick={() => {
        onClick();
        setPressed(!pressed);
      }}
      {...rest}
    >
      <Span>{context}</Span>
    </CardBtn>
  );
};

export default Tag;

const CardBtn = styled.button<any>`
  background-color: ${props => props.theme.gray_light};
  color: ${props => props.theme.gray_primary};

  ${props => {
    if (props.pressed) {
      return css`
        background-color: ${props => props.theme.text_primary_color};
        & > span {
          color: ${props => props.theme.text_secondary_color};
        }
      `;
    }
  }}

  :hover {
    background-color: ${props => props.theme.text_primary_color};
    & > span {
      color: ${props => props.theme.text_secondary_color};
    }
  }
`;

const Span = styled.span`
  ${tw`font-semibold`}
`;
