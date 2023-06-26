import React from "react";
import { useForm } from "react-hook-form";

import Input from "@components/ui/Input";
import { Button } from "@components/ui";

export default function OrderCode() {
  const { register, handleSubmit, getValues } = useForm();
  const onValid = () => {
    console.log("valid Action", getValues());
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="non-member-form flex my-5 flex-col space-y-4"
    >
      <div className="space-y-2">
        <label>Order Code</label>
        <Input
          id="orderCode"
          register={register("orderCode", { required: true })}
          required
        />
      </div>
      <Button className="group" variant="flat">
        <span className="font-semibold">Join</span>
      </Button>
    </form>
  );
}
