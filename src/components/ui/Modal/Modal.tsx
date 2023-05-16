import { FC, useRef, useEffect, useCallback, ReactNode } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  onEnter?: () => void | null;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return onClose();
      }
    },
    [onClose],
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
    <div
      ref={ref}
      className="fixed bg-black bg-opacity-10 flex items-center inset-0 z-[100] justify-center backdrop-blur-[1.2px]"
    >
      {children}
    </div>
  );
};

export default Modal;
