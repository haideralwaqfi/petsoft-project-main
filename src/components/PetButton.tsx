import React from "react";
import { Button } from "./ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
  onClick?: () => void; // add event handler for checkout action only, not for add or edit action.
};
export default function PetButton({
  actionType,
  onClick,
  children,
}: PetButtonProps) {
  if (actionType === "add") {
    return (
      <Button size="icon">
        <PlusCircledIcon className="h-6 w-6" />
      </Button>
    );
  }
  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
    //   return <Button size={}>Edit</Button>;
  }
  if (actionType === "checkout") {
    return (
      <Button onClick={onClick} variant="secondary">
        {children}
      </Button>
    );
  }
  return <Button>Edit</Button>;
}
