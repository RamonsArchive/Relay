import { SignIn, SignedOut } from "@clerk/nextjs";
import React from "react";

const favorites = () => {
  return (
    <div>
      <SignedOut>
        <SignIn />
      </SignedOut>
      page
    </div>
  );
};

export default favorites;
