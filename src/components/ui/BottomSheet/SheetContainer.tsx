import * as React from "react";
import { motion } from "framer-motion";

import { SheetContainerProps } from "./types";
import { useSheetContext } from "./context";
import { useEventCallbacks } from "./hooks";
import { MAX_HEIGHT } from "./constants";
import { mergeRefs } from "./utils";
import styles from "./styles";

const SheetContainer = React.forwardRef<any, SheetContainerProps>(
  ({ children, isMain, style = {}, className = "", ...rest }, ref) => {
    const {
      y,
      isOpen,
      progress,
      callbacks,
      snapPoints,
      fixedHeight,
      initialSnap = 0,
      sheetRef,
      windowHeight,
      detent,
      animationOptions,
      reduceMotion,
    } = useSheetContext(isMain);

    // console.log(progress.on("change", (lastet: number) => console.log(lastet)));

    const { handleAnimationComplete } = useEventCallbacks(isOpen, callbacks);
    // 컨테이너 초기 높이?
    const initialY = fixedHeight
      ? fixedHeight
      : snapPoints
      ? snapPoints[0] - snapPoints[initialSnap]
      : 0;
    const maxSnapHeight = snapPoints ? snapPoints[0] : null;

    const height =
      maxSnapHeight !== null
        ? `min(${maxSnapHeight}px, ${MAX_HEIGHT})`
        : MAX_HEIGHT;

    return (
      <motion.div
        {...rest}
        ref={mergeRefs([sheetRef, ref])}
        className={`react-modal-sheet-container ${className}`}
        style={{
          ...styles.container,
          ...style,
          ...(detent === "full-height" && { height }),
          ...(detent === "content-height" && { maxHeight: height }),
          y,
        }}
        initial={reduceMotion ? false : { y: windowHeight }}
        animate={{
          y: initialY,
          transition: fixedHeight
            ? { type: "tween", duration: 0 }
            : animationOptions,
        }}
        exit={{ y: windowHeight, transition: animationOptions }}
        onAnimationComplete={handleAnimationComplete}
      >
        {children}
      </motion.div>
    );
  },
);

export default SheetContainer;
