"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import PetForm from "./PetForm";

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
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (actionType === "checkout") {
    return (
      <Button onClick={onClick} variant="secondary">
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon">
            <PlusCircledIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add new pet" : "Edit pet"}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          type={actionType}
          onFormSubmission={() => setIsFormOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );

  return <Button>Edit</Button>;
}
