"use client";

import { addPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import React, { useState, createContext } from "react";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: number | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: number) => void;
  handleCheckoutPet: (id: number) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (petId: number, newPetData: Omit<Pet, "id">) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data: pets,
  children,
}: PetContextProviderProps) {
  //state
  // const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  //event handler
  const handleChangeSelectedPetId = (id: number) => {
    setSelectedPetId(id);
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    await addPet(newPet);
  };

  const handleEditPet = (petId: number, newPetData: Omit<Pet, "id">) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === petId ? { id: petId, ...newPetData } : pet))
    );
  };

  const handleCheckoutPet = (id: number) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        numberOfPets,
        selectedPet,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}>
      {children}
    </PetContext.Provider>
  );
}
