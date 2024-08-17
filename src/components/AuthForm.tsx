import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { login, signUp } from "@/actions/actions";

export default function AuthForm({ type }: { type: "logIn" | "signUp" }) {
  return (
    <form action={type === "logIn" ? login : signUp}>
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
      <Button className="">{type === "logIn" ? "Log In" : "Sign Up"}</Button>
    </form>
  );
}
