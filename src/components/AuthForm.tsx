"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { login, signUp } from "@/actions/actions";
import AuthFormButton from "./AuthFormButton";
import { useFormState } from "react-dom";

export default function AuthForm({ type }: { type: "logIn" | "signUp" }) {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchLogIn] = useFormState(login, undefined);
  return (
    <form action={type === "logIn" ? dispatchLogIn : dispatchSignUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required maxLength={100} />
      </div>
      <div className="mb-4 mt-2 space-y-1">
        <Label id="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          maxLength={100}
        />
      </div>
      <AuthFormButton type={type} />
      {signUpError && (
        <p className="text-red-500 text-sm mt-2">{signUpError.message}</p>
      )}
      {logInError && (
        <p className="text-red-500 text-sm mt-2">{logInError.message}</p>
      )}
    </form>
  );
}
