import React from "react";
import cn from "clsx";
import { motion } from "framer-motion";

import { Tab, TabText, Tabs } from "./Tab.styles";

interface TabComponentProps {
  tabContents: Array<string>;
  tabClickHandler: (index: number) => void;
  focusedTab: number;
  className?: string;
  style?: object;
}

const TabComponent: React.FC<TabComponentProps> = ({
  tabContents,
  tabClickHandler,
  focusedTab = -1,
  className,
  style,
}) => {
  const rootClassName = cn(
    "relative w-full h-full flex justify-between items-center",
    {},
    className,
  );

  return (
    <Tabs className={rootClassName} style={style}>
      {tabContents.map((item, index) => (
        <Tab key={index} onClick={() => tabClickHandler(index)}>
          <TabText focused={index === focusedTab}>{item}</TabText>
          {index === focusedTab ? (
            <motion.div className="underline" layoutId="underline" />
          ) : null}
        </Tab>
      ))}
    </Tabs>
  );
};

export default TabComponent;
