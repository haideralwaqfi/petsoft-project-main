"use client";
import { usePetContext } from "@/lib/hooks";
import React from "react";

type statProps = {
  numberOfPets: number; // Number of pets in the current context.
};
export default function Stat() {
  const { numberOfPets } = usePetContext();
  return (
    <section className="text-center">
      <p className="font-2xl font-bold leading-6">{numberOfPets}</p>
      <p className="opacity-80">Current guest</p>
    </section>
  );
}
