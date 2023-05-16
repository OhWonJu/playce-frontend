import React, { useCallback, useRef, useState } from "react";
import cn from "clsx";

import { BORDER_BASE_WIDTH } from "constants/constants";
import useResizeObserver from "@lib/client/hooks/useResizeObserver";
import styled from "styled-components";
import tw from "twin.macro";

interface Props {
  context: string;
  className?: string;
  lineClamp?: number;
  [key: string]: any;
}

const EllipsisText: React.FC<Props> = ({
  context,
  className,
  lineClamp = 2,
  ...rest
}) => {
  const rootClassName = cn("text-base", {}, className);

  return (
    <EllipsisA className={rootClassName} lineClamp={lineClamp} {...rest}>
      {context}
    </EllipsisA>
  );
};

export default EllipsisText;

const EllipsisA = styled.a<any>`
  position: relative;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.lineClamp};
  -webkit-box-orient: vertical;
  line-height: 1rem;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
`;
