"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./PetFormBtn";
import { useForm } from "react-hook-form";
import { Span } from "next/dist/trace";

type PetFormProps = {
  type: "add" | "edit";
  onFormSubmission: () => void;
};

type TPetForm = {
  name: string;
  ownerName: string;
  age: number;
  note: string;
  imageUrl: string;
};

export default function PetForm({ type, onFormSubmission }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet, selectedPetId } =
    usePetContext();
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<TPetForm>();
  return (
    <form
      action={async (formData) => {
        const result = await trigger();
        if (!result) return;
        onFormSubmission();
        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          age: Number(formData.get("age"))!,
          notes: formData.get("note") as string,
          imageUrl:
            (formData.get("imageUrl") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        };

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
          <Input
            id="name"
            {...register("name", {
              required: "name is required",
              minLength: {
                value: 3,
                message: "name must be at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 ">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            {...register("ownerName", {
              required: "owner name is required",
              maxLength: {
                value: 5,
                message: "owner nae must be max 5 characters",
              },
            })}
          />
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
          <Label htmlFor="note">Note</Label>
          <Textarea id="note" {...register("note")} />
          {errors.note && (
            <p className="text-red-500 ">{errors.note.message}</p>
          )}
        </div>
      </div>
      <PetFormBtn type={type} />
    </form>
  );
}
