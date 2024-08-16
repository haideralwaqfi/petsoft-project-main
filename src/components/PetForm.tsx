"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./PetFormBtn";
import { useForm } from "react-hook-form";
import { Span } from "next/dist/trace";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { petFormSchema, TPetForm } from "@/lib/validation";

type PetFormProps = {
  type: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({ type, onFormSubmission }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet, selectedPetId } =
    usePetContext();
  const {
    register,
    trigger,
    getValues,

    formState: { errors, defaultValues },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      type == "edit"
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
          }
        : undefined,
  });
  return (
    <form
      action={async (formData) => {
        const result = await trigger();
        if (!result) return;
        onFormSubmission();
        const petData = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

        if (type === "add") {
          await handleAddPet(petData);
        } else if (type === "edit") {
          await handleEditPet(selectedPetId!, petData);
        }
      }}
      className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 ">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} d />
          {errors.ownerName && (
            <p className="text-red-500 ">{errors.ownerName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-red-500 ">{errors.imageUrl.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && <p className="text-red-500 ">{errors.age.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Note</Label>
          <Textarea id="notes" {...register("notes")} />
          {errors.notes && (
            <p className="text-red-500 ">{errors.notes.message}</p>
          )}
        </div>
      </div>
      <PetFormBtn type={type} />
    </form>
  );
}
