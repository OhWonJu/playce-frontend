import cn from "clsx";
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from "react";
import { LoadingDots } from "@components/ui";
import { mergeRefs } from "react-merge-refs";
import { StyledComponent } from "styled-components";
import { Disabled, Flat, Naked } from "./Button.styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant: "flat" | "naked" | "disabled";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  children: any;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

const ButtonType = {
  flat: Flat,
  naked: Naked,
  disabled: Disabled,
};

// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = "flat",
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    children,
    ...rest
  } = props;
  const Component = ButtonType[variant];
  const ref = useRef<typeof Component>(null);

  const rootClassName = cn(
    "px-4 py-4 rounded-md",
    {
      //   [s.ghost]: variant === "ghost",
      //   [s.slim]: variant === "slim",
      //   [s.naked]: variant === "naked",
      //   [s.loading]: loading,
      //   [s.disabled]: disabled,
    },
    className,
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
});

export default Button;
