import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return <SignUp afterSignInUrl="/" />;
};

export default SignUpPage;
