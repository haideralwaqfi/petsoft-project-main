import AuthForm from "@/components/AuthForm";
import H1 from "@/components/H1";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5">Sign up</H1>
      <AuthForm type="signUp" />
      <p className="mt-6 text-sm text-zinc-500">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
