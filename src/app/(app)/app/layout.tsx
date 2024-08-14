import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/context/PetContextProvider";
import SearchContextProvider from "@/context/searchContextProvider";
import prisma from "@/lib/db";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pets = await prisma.pet.findMany();

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col min-h-screen max-w-[1050px] mx-auto px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
