import cn from "clsx";
import React, { FC, ReactNode, useState } from "react";
import s from "./Collapse.module.css";
import { ChevronRight } from "@components/icons";
import { useSpring, a } from "@react-spring/web";
import useMeasure from "react-use-measure";
import useTheme from "@lib/client/hooks/useTheme";

export interface CollapseProps {
  title: string;
  children: ReactNode;
}

const Collapse: FC<CollapseProps> = ({ title, children }) => {
  const theme = useTheme();

  const [isActive, setActive] = useState(false);
  const [ref, { height: viewHeight }] = useMeasure();

  const animProps = useSpring({
    height: isActive ? viewHeight : 0,
    config: { tension: 250, friction: 32, clamp: true, duration: 150 },
    opacity: isActive ? 1 : 0,
  });

  const toggle = () => setActive(x => !x);

  return (
    <div
      className="_collabse border-b py-4 flex flex-col outline-none"
      style={{ borderColor: theme.gray_light }}
      tabIndex={0}
      aria-expanded={isActive}
    >
      <div
        className={"flex flex-row items-cente my-2"}
        role="button"
        onClick={toggle}
      >
        <ChevronRight
          className={cn("text-base font-medium", s.icon, {
            [s.open]: isActive,
          })}
        />
        <span className={"pl-2 text-base font-medium"}>{title}</span>
      </div>
      {/* @ts-ignore */}
      <a.div style={{ overflow: "hidden", ...animProps }}>
        <div ref={ref} className="overflow-hidden pl-8">
          {children}
        </div>
      </a.div>
    </div>
  );
};

export default React.memo(Collapse);
