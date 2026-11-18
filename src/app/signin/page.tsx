import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <main className="mx-auto box-border max-w-[600px] px-6 py-[72px]">
      <Suspense>
        <SignInForm />
      </Suspense>
    </main>
  );
}
