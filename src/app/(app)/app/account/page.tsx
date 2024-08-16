import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import SignOutBtn from "@/components/SignOutBtn";
export default async function page() {
  const session = await auth();
  if (!session?.user?.email) {
    return redirect("/login");
  }
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>
      <ContentBlock className="h-[500px] flex flex-col gap-3 justify-center items-center">
        <p>Logged in as {session.user.email}</p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
