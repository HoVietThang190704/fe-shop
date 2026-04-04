"use client";

import { AuthLayoutWrapper } from "@/components/auth/auth-layout-wrapper";
import { RegisterForm } from "@/components/auth/register-form";
import { AUTH_TEXT } from "@/lib/constants/auth-text";

export default function RegisterPage() {
  return (
    <AuthLayoutWrapper
      title={AUTH_TEXT.register.title}
      description={AUTH_TEXT.register.description}
    >
      <RegisterForm />
    </AuthLayoutWrapper>
  );
}
