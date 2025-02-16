"use client";
import { error } from "console";
import Form from "next/form";
import React, { useActionState } from "react";

const ReviewForm = () => {
  const handleFormSubmit = () => {
    return "";
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, "");
  return (
    <div>
      <Form action={formAction}></Form>
    </div>
  );
};

export default ReviewForm;
