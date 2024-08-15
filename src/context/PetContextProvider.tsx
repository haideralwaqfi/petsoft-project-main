"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";

import React, {
  useState,
  createContext,
  useOptimistic,
  startTransition,
} from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: Pet["id"]) => Promise<void | string | number>;
  handleAddPet: (newPet: PetEssentials) => Promise<void | string | number>;
  handleEditPet: (petId: Pet["id"], newPetData: PetEssentials) => void;
  handleResetPetForm: () => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data: pets,
  children,
}: PetContextProviderProps) {
  //state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    pets,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              pet.id === payload.id ? { ...pet, ...payload.newPetData } : pet;
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        case "reset":
          return [...state, { name: "" }];
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);

  const numberOfPets = optimisticPets.length;

  //event handler
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
    console.log(id);
  };

  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error?.message) return toast.warning(error.message);
  };

  const handleResetPetForm = () => {
    setSelectedPetId(null);
  };

  const handleEditPet = async (petId: Pet["id"], newPetData: PetEssentials) => {
    setOptimisticPets({
      action: "edit",
      payload: { id: petId, newPetData: newPetData },
    });
    const error = await editPet(petId, newPetData);
    if (error?.message) return toast.warning(error.message);
  };

  const handleCheckoutPet = async (petId: Pet["id"]) => {
    setOptimisticPets({ action: "delete", payload: petId });

    const error = await deletePet(petId);
    if (error?.message) return toast.warning(error.message);
    setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        numberOfPets,
        selectedPet,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
        handleResetPetForm,
      }}>
      {children}
    </PetContext.Provider>
  );
}
