import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function PetFormBtn({ type }: { type: "add" | "edit" }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="mt-5 self-end">
      {type === "add" ? "Add new pet" : "Edit pet"}
    </Button>
  );
}
