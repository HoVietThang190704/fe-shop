"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "./CartProvider";
import { FavoriteProvider } from "./FavoriteProvider";
import { User } from "@/lib/interface/user.interface";
import { Toaster } from "@/components/ui/sonner";

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
        <CartProvider>
          <FavoriteProvider>
            {children}
            <Toaster position="top-center" richColors />
          </FavoriteProvider>
        </CartProvider>
      </AuthProvider>
    </NextThemesProvider>
  );
}
