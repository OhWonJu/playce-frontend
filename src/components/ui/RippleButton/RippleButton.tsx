import React, { MouseEvent, useCallback, useRef } from "react";

import { ButtonWrapper, Ripple } from "./RippleButton.styles";
import s from "./RippleButton.module.css";

interface ButtonProps {
  className?: string;
  type?: "submit" | "reset" | "button";
  rippleColor?: string;
  clickHandler?: () => void;
  handlerDelay?: number;
  children?: React.ReactNode;
  [key: string]: any;
}

const RippleButton: React.FC<ButtonProps> = ({
  className,
  type = "button",
  rippleColor,
  clickHandler = () => null,
  handlerDelay = 0,
  children,
  ...rest
}) => {
  const rippleRef = useRef<HTMLSpanElement>(null);

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${
      event.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      event.clientY - button.getBoundingClientRect().top - radius
    }px`;
    circle.classList.add(s.ripple);

    const existingRipple = button.querySelector(`.${s.ripple}`);

    if (existingRipple) {
      existingRipple.remove();
    }

    rippleRef.current?.appendChild(circle);
  };

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      setTimeout(() => clickHandler(), handlerDelay);
    },
    [clickHandler],
  );

  return (
    <ButtonWrapper
      type={type}
      onClick={handleClick}
      rippleColor={rippleColor}
      className={className}
      {...rest}
    >
      {children}
      <Ripple ref={rippleRef} className="ripple" />
    </ButtonWrapper>
  );
};

export default RippleButton;
