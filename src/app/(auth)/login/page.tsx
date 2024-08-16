import AuthForm from "@/components/AuthForm";
import H1 from "@/components/H1";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5">Log In</H1>
      <AuthForm />
      <p className="mt-6 mt-6 text-sm text-zinc-500">
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
