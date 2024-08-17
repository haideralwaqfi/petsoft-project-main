import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/context/PetContextProvider";
import SearchContextProvider from "@/context/searchContextProvider";
import prisma from "@/lib/db";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkAuth, getPetsByUserId } from "@/lib/server-utils";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();

  const pets = await getPetsByUserId(session.user.id);

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
