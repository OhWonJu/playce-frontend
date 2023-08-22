import React from "react";

import { SignUpView } from "@components/auth";
import { Container } from "@components/ui";

const join = () => {
  return (
    <Container containPlayer={false}>
      <SignUpView />
    </Container>
  );
};

export default join;
