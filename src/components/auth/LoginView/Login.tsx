import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { validate as emailVaildate } from "email-validator";

import { LogInProps } from "src/commonTypes/users";
import { _POST } from "@lib/server/rootAPI";
import { Button, Input, InputLabel, useUI } from "@components/ui";
import { _LOGIN } from "@lib/server/api/user/login";
import { useAuth } from "@lib/client/hooks/useAuth";
import { useRouter } from "next/router";
import { useLocalStorage } from "@lib/client/hooks/useLocalStorage";

interface LoginFormProps {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { closeModal } = useUI();
  const { setAuth } = useAuth();
  const [_, setToken] = useLocalStorage("token");

  // React Query //
  const mutation = useMutation({
    mutationFn: async (formData: LogInProps) => await _LOGIN(formData),
    onSuccess: data => {
      console.log("SUCCESS: ", data);
      setAuth({ isLogIn: true, token: data.access_token });
      setToken(data.access_token);
      closeModal();
      router.push("/home");
    },
  });
  // -------------------------------------------------------------- //

  // React Form Hook //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    mode: "onChange",
  });

  const onValid = (data: LoginFormProps) => {
    mutation.mutate(data);
  };
  
  const onInvaild = (errors: FieldErrors) => {
    console.log(errors);
  };
  // --------------------------------------------- //

  return (
    <form
      onSubmit={handleSubmit(onValid, onInvaild)}
      className="member-form flex flex-col my-4 space-y-4"
    >
      {/* Email Form */}
      <div className="space-y-2">
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
          isInvalid={Boolean(errors.email?.message)}
        />
      </div>
      {/* Password Form */}
      <div className="space-y-2">
        <InputLabel title="Password" help={errors.password?.message} />
        <Input
          register={register("password", {
            required: "Password is required",
            minLength: {
              message: "Password Should be longer then 8 chars",
              value: 4,
            },
            validate: {
              // patternCheck: () => true
            },
          })}
          id="password"
          type="password"
          required
          isInvalid={Boolean(errors.password?.message)}
        />
      </div>
      {/* Submit Btn */}
      <Button variant="flat" type="submit">
        <span className="font-semibold">Log In</span>
      </Button>
    </form>
  );
}
