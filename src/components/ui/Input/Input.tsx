import React, { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import cn from "clsx";
import styled from "styled-components";
import tw from "twin.macro";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  kind?: "text" | "phone" | "price";
  register: UseFormRegisterReturn;
  isInvalid?: boolean;
  required: boolean;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  className,
  onChange,
  kind = "text",
  register,
  required,
  isInvalid,
  ...rest
}: InputProps) => {
  const rootClassName = cn(
    "appearance-none px-4 py-3 rounded-md shadow-sm box-border focus:outline-none focus:ring-black focus:ring-0",
    {},
    className,
  );

  return (
    <>
      {kind === "text" && (
        <InputComponent
          className={rootClassName}
          required={required}
          isInvalid={isInvalid}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          {...register}
          {...rest}
        />
      )}
      {kind === "phone" && null}
      {kind === "price" && null}
    </>
  );
};

export default Input;

const InputComponent = styled.input<any>`
  width: 100%;
  background-color: ${props => props.theme.gray_light};
  color: ${props => props.theme.text_primary_color};
  border-width: 1.4px;
  border-color: transparent;
  line-height: 1rem;
  &:focus {
    border-color: ${props =>
      props.isInvalid ? props.theme.red_primary : props.theme.black_primary};
  }
  border-color: ${props => props.isInvalid && props.theme.red_primary};
  /* ${tw`appearance-none px-4 py-3 rounded-md shadow-sm box-border focus:outline-none focus:ring-black focus:ring-0`}; */
`;
