"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "./AuthProvider";
import { User } from "@/lib/interface/user.interface";

export function Providers({ 
  children,
  initialUser
}: { 
  children: React.ReactNode;
  initialUser: User | null;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <AuthProvider initialUser={initialUser}>
        {children}
      </AuthProvider>
    </NextThemesProvider>
  );
}
