"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "./CartProvider";
import { FavoriteProvider } from "./FavoriteProvider";
import { NotificationProvider } from "./NotificationProvider";
import { User } from "@/lib/interface/user.interface";

import { Toaster } from "@/components/ui/sonner";
import { ChatWidget } from "@/components/chat/ChatWidget";

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
        <FavoriteProvider>
          <CartProvider>
            <NotificationProvider>
              {children}
              <ChatWidget />
              <Toaster position="top-center" richColors />
            </NotificationProvider>
          </CartProvider>
        </FavoriteProvider>

      </AuthProvider>
    </NextThemesProvider>
  );
}
