import { FC, useState, useMemo } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { validate as emailVaildate } from "email-validator";
import styled from "styled-components";
import tw from "twin.macro";

import { Row } from "src/styles/GlobalStyle";
import { useUI } from "@components/ui/context";
import { Button, Input, InputLabel } from "@components/ui";
import {
  BORDER_TINE_WIDTH,
  MOBILEABLE_CONTAINER_HORIZONTAL_SPACE,
} from "constants/constants";
import PolicyListView from "./PolicyListView";
import useTheme from "@lib/client/hooks/useTheme";
import Header from "./Header";

interface Props {}

interface SignUpFormProps {
  userName: string;
  email: string;
  password: string;
  passwordDoubleCheck: string;
}

const SignUpView: FC<Props> = () => {
  const theme = useTheme();

  const { setModalView, openModal } = useUI();

  const [policiesAccept, setPoliciesAccept] = useState(false);

  // React Form Hook //
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormProps>({
    mode: "onChange",
  });

  const onValid = (data: SignUpFormProps) => {
    console.log("valid Action", data);
  };
  const onInvaild = (errors: FieldErrors) => {
    console.log(errors);
  };
  // --------------------------------------------- //

  // From Validation Functions //
  const passwordDoubleChecking = (value: string) => {
    console.log(value, getValues("password"));
    return value === getValues("password");
  };
  // ------------------------------------------------- //

  const InputStyle = useMemo(
    () => ({
      borderColor: "transparent",
      backgroundColor: "transparent",
      borderWidth: BORDER_TINE_WIDTH,
      // @ts-ignore
      borderColor: theme.gray_light + 50,
    }),
    [],
  );

  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <Wrapper>
          {/* Animated Header */}
          <Header />
          {/* Wrapper for Mobile able view */}
          <InnerWrapper className={MOBILEABLE_CONTAINER_HORIZONTAL_SPACE}>
            {/* SIGN UP FORM */}
            <form
              onSubmit={handleSubmit(onValid, onInvaild)}
              className="member-form flex flex-col mt-4 mb-8 space-y-8"
            >
              {/* USER NAME */}
              <InputWrapper>
                <InputLabel title="UserName" help={errors.userName?.message} />
                <Row className="w-full justify-between">
                  <Input
                    register={register("userName", {
                      required: "UserName is required",
                      validate: {
                        // userNameFormCheck: value => true,
                      },
                    })}
                    id="userName"
                    type="text"
                    required
                    placeholder="EN + NUMBER LEN 5 - 11"
                    isInvalid={Boolean(errors.userName?.message)}
                    className="shadow-md focus:shadow-inner bg-transparent"
                    style={{
                      width: "70%",
                      ...InputStyle,
                    }}
                  />
                  <TempButton
                    type="button"
                    // onClick={() => console.log("ASD")}
                    className="shadow-md focus:shadow-inner"
                  >
                    <span className="text-sm font-semibol">중복 확인</span>
                  </TempButton>
                </Row>
              </InputWrapper>
              {/* PASSWORD  */}
              <InputWrapper>
                <InputLabel title="Password" help={errors.password?.message} />
                <Input
                  register={register("password", {
                    required: "Password is required",
                    minLength: {
                      message: "Password Should be longer then 8 chars",
                      value: 8,
                    },
                    validate: {
                      // patternCheck: () => true
                    },
                  })}
                  id="password"
                  type="password"
                  required
                  placeholder="숫자, 영문, 특수문자 조합 최소 8자"
                  isInvalid={Boolean(errors.password?.message)}
                  className="shadow-md focus:shadow-inner bg-transparent"
                  style={{
                    ...InputStyle,
                  }}
                />
              </InputWrapper>
              {/* PASSWORD DOUBLE CHECK */}
              <InputWrapper>
                <InputLabel
                  title="Password Check"
                  help={errors.passwordDoubleCheck?.message}
                />
                <Input
                  register={register("passwordDoubleCheck", {
                    required: "Password Check is required",
                    validate: {
                      doubleCheck: value =>
                        passwordDoubleChecking(value) || "Check your password",
                    },
                  })}
                  id="passwordCheck"
                  type="password"
                  required
                  placeholder="비밀번호 확인"
                  isInvalid={Boolean(errors.passwordDoubleCheck?.message)}
                  className="shadow-md focus:shadow-inner bg-transparent"
                  style={{
                    ...InputStyle,
                  }}
                />
              </InputWrapper>
              {/* EMAIL */}
              <InputWrapper>
                <InputLabel title="Email" help={errors.email?.message} />
                <Input
                  register={register("email", {
                    required: "Email is required",
                    validate: {
                      emailFormCheck: value =>
                        emailVaildate(value) || "Check your email form",
                    },
                  })}
                  id="email"
                  type="email"
                  required
                  placeholder="Verification for sign up"
                  isInvalid={Boolean(errors.email?.message)}
                  className="shadow-md focus:shadow-inner bg-transparent"
                  style={{
                    ...InputStyle,
                  }}
                />
              </InputWrapper>
            </form>
            {/* POLICY */}
            <PolicyListView setPoliciesAccept={setPoliciesAccept} />
            {/* 인증 및 SUBMIT */}
            <div className="flex justify-center items-center mt-5">
              <Button
                variant="flat"
                type="submit"
                onClick={handleSubmit(onValid, onInvaild)}
              >
                <span className="font-semibold">본인인증하고 가입하기</span>
              </Button>
            </div>
            {/* REDIRECT TO LOG IN */}
            <div className="sign-wrapper flex flex-col w-full mt-14 mb-5 space-y-4 relative">
              <div
                className="absolute top-5 w-full border-t-[1.5px]"
                style={{ borderColor: theme.gray_light }}
              />
              <div className="relative -top-[0.3rem] text-center">
                <span
                  className="px-2 text-sm"
                  style={{
                    backgroundColor: theme.container_bg_color,
                    color: theme.gray_primary,
                  }}
                >
                  Do you already have an aacount?
                </span>
              </div>
              <div className="flex justify-center items-center">
                <Button
                  variant="flat"
                  type="button"
                  onClick={() => {
                    setModalView("LOGIN_VIEW");
                    openModal();
                  }}
                >
                  <span className="font-semibold">Log In</span>
                </Button>
              </div>
            </div>
          </InnerWrapper>
        </Wrapper>
      </div>
    </>
  );
};

export default SignUpView;

const Wrapper = styled.div`
  ${tw`flex flex-col min-h-screen w-full sm:max-w-[450px] items-center py-6 sm:px-10`}
`;

const InnerWrapper = styled.div`
  ${tw`flex flex-col w-full pb-5 px-6`}
`;

const InputWrapper = styled.div`
  ${tw`space-y-2`}
`;

const TempButton = styled.button`
  background-color: ${props => props.theme.gray_light};
  width: 30%;
  & > span {
    color: ${props => props.theme.gray_primary};
  }
  &:hover {
    background-color: ${props => props.theme.black_primary};
    & > span {
      color: ${props => props.theme.text_secondary_color};
    }
  }
  ${tw`ml-3 rounded-md transition duration-100`}
`;
