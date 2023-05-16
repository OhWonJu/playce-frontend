import { FC, useRef, useEffect, useCallback } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import styled, { css, keyframes } from "styled-components";
import tw from "twin.macro";

import { Cross } from "@components/icons";
import { useUI } from "@components/ui";

// import FocusTrap from "@lib/focus-trap";

interface ModalLayoutProps {
  className?: string;
  children?: any;
  modalTitle?: string;
  mobileForm?: boolean;
  handleClose?: () => void;
  onEnter?: () => void | null;
}

const ModalLayout: FC<ModalLayoutProps> = ({
  className,
  children,
  handleClose = () => null,
  modalTitle = "",
  mobileForm = false,
}) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { closeModal } = useUI();

  const _handleClose = () => {
    handleClose();
    closeModal();
  };

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return _handleClose();
      }
    },
    [handleClose, closeModal],
  );

  useEffect(() => {
    const modal = ref.current;

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: false });
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return (
    <ModalWrapper
      ref={ref}
      role="dialog"
      className={className}
      $animation={animation}
      $mobileForm={mobileForm}
    >
      <div className="absolute left-0 top-0 w-full mt-6">
        <div className="modal-title-text relative text-center w-[70%] truncate m-auto text-lg font-semibold font-sansSrif">
          {modalTitle}
        </div>
      </div>
      <button
        onClick={() => _handleClose()}
        aria-label="Close panel"
        className="hover:text-accent-5 transition ease-in-out duration-150 focus:outline-none absolute right-0 top-0 m-6"
      >
        <Cross className="h-6 w-6" />
      </button>
      <div
        className={`outline-none h-full ${
          mobileForm && "overflow-y-scroll scrollbar-hide"
        }`}
      >
        {children}
      </div>
      {/* <FocusTrap focusFirst>{children}</FocusTrap> */}
    </ModalWrapper>
  );
};

export default ModalLayout;

const animation = keyframes`
  0% {
    transform: translateY(100vh);
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
`;

const ModalWrapper = styled.div<any>`
  /* width: 100%; */
  background-color: ${props => props.theme.container_bg_color};
  ${props => {
    if (props.$mobileForm) {
      return css`
        animation: ${props.$animation} 300ms
          cubic-bezier(0.25, 0.46, 0.45, 0.94) 1;
      `;
    }
  }};

  ${tw`py-12 px-5 md:px-10 border relative shadow-md`} /* ${props =>
    props.$mobileForm ? `${tw`overflow-auto`}` : null} */
  ${props =>
    props.$mobileForm && tw`h-[100%] w-[100%] sm:h-screen sm:max-w-[420px]`}
`;
