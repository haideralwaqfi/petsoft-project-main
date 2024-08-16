import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AuthForm() {
  return (
    <form>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </div>
      <div className="mb-4 mt-2 space-y-1">
        <Label id="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <Button className="">Log in</Button>
    </form>
  );
}
