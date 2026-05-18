import { Suspense } from "react";
import SignupPage from "@/components/signup/SignupApp";

export default function LoginRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SignupPage initialMode="login" />
    </Suspense>
  );
}
