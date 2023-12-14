import * as React from "react";
import { motion } from "framer-motion";

import { SheetDraggableProps } from "./types";
import { useSheetContext } from "./context";
import styles from "./styles";

const SheetContent = React.forwardRef<any, SheetDraggableProps>(
  ({ children, isMain, style, disableDrag, className = "", ...rest }, ref) => {
    const positionRef = React.useRef<HTMLDivElement>(null);
    const { dragProps } = useSheetContext(isMain);
    const _dragProps = disableDrag ? undefined : dragProps;

    return (
      <>
        <div ref={positionRef} />
        <motion.div
          {...rest}
          ref={ref}
          className={`react-modal-sheet-content ${className}`}
          style={{ ...styles.content, ...style }}
          {..._dragProps}
          // dragConstraints={positionRef}
        >
          {children}
        </motion.div>
      </>
    );
  },
);

export default SheetContent;
