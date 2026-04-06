"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Heart, User, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOME_CONTENT } from "@/lib/constants/home-content";
import { useAuth } from "@/provider/AuthProvider";
import { useCart } from "@/provider/CartProvider";
import { useFavorites } from "@/provider/FavoriteProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { favoriteCount } = useFavorites();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = transparent && !isScrolled;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12",
        isTransparent
          ? "bg-transparent text-white"
          : "bg-white/80 dark:bg-black/80 backdrop-blur-md text-foreground shadow-sm"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-tighter"
        >
          {HOME_CONTENT.navbar.logo}
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center space-x-8 md:flex">
          {HOME_CONTENT.navbar.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary/70"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <button className="transition-colors hover:text-primary/70">
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => router.push("/favorites")}
            className="relative transition-colors hover:text-primary/70 cursor-pointer p-1"
            aria-label="Open favorites"
          >
            <Heart className="h-5 w-5" />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold animate-in zoom-in duration-300">
                {favoriteCount}
              </span>
            )}
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="transition-colors hover:text-primary/70 outline-none">
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border-border/40 shadow-2xl p-2">
                <DropdownMenuLabel className="px-4 py-3">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">{user.fullName || user.username}</p>
                    <p className="text-[10px] font-medium leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/40 my-1" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex h-10 items-center rounded-xl px-4 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex h-10 items-center rounded-xl px-4 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex h-10 items-center rounded-xl px-4 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground cursor-pointer">
                    Orders
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-border/40 my-1" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex h-10 items-center rounded-xl px-4 text-sm font-bold text-destructive hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground transition-colors cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="transition-colors hover:text-primary/70">
              <User className="h-5 w-5" />
            </Link>
          )}

          <button 
            onClick={() => router.push("/cart")}
            className="relative transition-colors hover:text-primary/70 cursor-pointer p-1"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
