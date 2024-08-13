"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
type PetFormProps = {
  type: "add" | "edit";
  onFormSubmission: () => void;
};
export default function PetForm({ type, onFormSubmission }: PetFormProps) {
  const { handleAddPet, selectedPet, handleEditPet } = usePetContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pet = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: Number(formData.get("age")),
      notes: formData.get("note") as string,
    };

    if (type === "add") {
      handleAddPet(pet);
    } else if (type === "edit") {
      handleEditPet(selectedPet!.id, pet);
    }

    onFormSubmission();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
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
      <Button type="submit" className="mt-5 self-end">
        {type === "add" ? "Add new pet" : "Edit pet"}
      </Button>
    </form>
  );
}
