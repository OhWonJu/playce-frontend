import React, { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

import { VerticalSidebar } from "@components/ui";
import {
  BORDER_BASE_WIDTH,
  MAX_CONTENT_WIDTH,
  NAV_HEIGHT,
  VERTICAL_SIDEBAR_WIDTH,
} from "constants/constants";
import { useRouter } from "next/router";

// Vertical Side bar //
const VerticalSidebarUI: React.FC<{
  children?: any;
}> = ({ children }) => {
  return <VerticalSidebar>{children}</VerticalSidebar>;
};
// ---------------------------------------------------- //

interface ContainerProps {
  className?: string;
  children?: any;
  verticalSidebarVisible?: boolean;
  verticalSidebarChildren?: any;
  widthLimit?: boolean;
  [key: string]: any;
}

const Container: FC<ContainerProps> = ({
  children,
  className,
  verticalSidebarVisible = true,
  verticalSidebarChildren,
  widthLimit = true,
  ...rest
}) => {
  return (
    <Wrapper className={className} widthLimit={widthLimit} {...rest}>
      <div className="sm:w-full flex flex-row">
        {/* 왼편 사이드 바 */}
        {verticalSidebarVisible && (
          <VerticalSidebarUI>{verticalSidebarChildren}</VerticalSidebarUI>
        )}
        <div
          className={`w-full h-full px-[0.8rem] md:px-14 ${
            verticalSidebarVisible ? `md:ml-[250px]` : "md:ml-0"
          }`}
        >
          {children}
        </div>
      </div>
    </Wrapper>
  );
};

export default Container;

const Wrapper = styled.div<any>`
  position: relative;
  background-color: ${props => props.theme.background_color};
  /* border-top-width: ${BORDER_BASE_WIDTH}px;
  border-color: ${props => props.theme.gray_light}; */
  margin-top: ${NAV_HEIGHT}px;

  ${props => {
    if (props.widthLimit) {
      return css`
        width: ${MAX_CONTENT_WIDTH}px;
        max-width: 100%;
        ${tw`mx-auto`}
      `;
    }
  }}
`;
