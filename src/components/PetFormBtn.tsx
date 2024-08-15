import React from "react";
import { Button } from "./ui/button";

export default function PetFormBtn({ type }: { type: "add" | "edit" }) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {type === "add" ? "Add new pet" : "Edit pet"}
    </Button>
  );
}
