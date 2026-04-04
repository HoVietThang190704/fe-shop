"use client"

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HOME_CONTENT } from "@/lib/constants/home-content";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const { title, subtitle, primaryCTA, secondaryCTA, image } = HOME_CONTENT.hero;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover brightness-[0.85] contrast-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center space-y-8 px-6 text-center md:items-start md:text-left">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-5xl font-serif font-bold tracking-tight text-white sm:text-6xl md:text-8xl animate-in slide-in-from-bottom-5 duration-700">
            {title}
          </h1>
          <p className="text-lg font-medium text-white/90 sm:text-xl md:text-2xl animate-in slide-in-from-bottom-5 duration-1000 delay-150">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 animate-in slide-in-from-bottom-5 duration-1000 delay-300">
          <Button
            size="lg"
            className="h-12 rounded-full px-8 text-base font-semibold transition-transform hover:scale-105 active:scale-95"
          >
            {primaryCTA}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-2 border-white bg-transparent px-8 text-base font-semibold text-white transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95"
          >
            {secondaryCTA}
          </Button>
        </div>
      </div>
    </section>
  );
}
