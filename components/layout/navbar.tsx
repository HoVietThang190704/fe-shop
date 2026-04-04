"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, User, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOME_CONTENT } from "@/lib/constants/home-content";

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <button className="transition-colors hover:text-primary/70">
            <Heart className="h-5 w-5" />
          </button>
          <Link href="/login" className="transition-colors hover:text-primary/70">
            <User className="h-5 w-5" />
          </Link>
          <button className="relative transition-colors hover:text-primary/70">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
