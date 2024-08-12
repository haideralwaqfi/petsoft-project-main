import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import React from "react";

export default function page() {
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>
      <ContentBlock className="h-[500px] flex justify-center items-center">
        <p>Logged in as ...</p>
      </ContentBlock>
    </main>
  );
}
