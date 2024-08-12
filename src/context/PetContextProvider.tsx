"use client";

import { Pet } from "@/lib/types";
import React, { useState, createContext } from "react";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: number | null;
  handleChangeSelectedPetId: (id: number) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const handleChangeSelectedPetId = (id: number) => {
    setSelectedPetId(id);
  };

  console.log(selectedPetId);

  return (
    <PetContext.Provider
      value={{ pets, selectedPetId, handleChangeSelectedPetId }}>
      {children}
    </PetContext.Provider>
  );
}
