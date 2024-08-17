"use client";

import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
type AuthFomBtnProps = {
  type: "logIn" | "signUp";
};

export default function AuthFormButton({ type }: AuthFomBtnProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {type === "logIn" ? "Log In" : "Sign Up"}
    </Button>
  );
}
