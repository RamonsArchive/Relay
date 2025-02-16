import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <div className="auth bg-secondary-200">
      <SignIn />
    </div>
  );
};

export default SignInPage;
