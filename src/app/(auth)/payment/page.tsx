import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>PetSoft access requires payment</H1>
      <Button>Buy life access for $299</Button>
    </main>
  );
}
