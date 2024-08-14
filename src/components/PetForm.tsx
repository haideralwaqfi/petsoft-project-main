"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import { addPet } from "@/actions/actions";
import PetFormBtn from "./PetFormBtn";
import { toast } from "sonner";
type PetFormProps = {
  type: "add" | "edit";
  onFormSubmission: () => void;
};
export default function PetForm({ type, onFormSubmission }: PetFormProps) {
  const { selectedPet } = usePetContext();
  return (
    <form
      action={async (formData) => {
        const error = await addPet(formData);
        if (error?.message) return toast.warning(error.message);
        onFormSubmission();
      }}
      className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={type === "edit" ? selectedPet?.name : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={type === "edit" ? selectedPet?.ownerName : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={type === "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="text"
            required
            defaultValue={type === "edit" ? selectedPet?.age : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="note">Note</Label>
          <Textarea
            id="note"
            name="note"
            rows={3}
            required
            defaultValue={type === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>
      <PetFormBtn type={type} />
    </form>
  );
}
