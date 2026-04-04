import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HOME_CONTENT } from "@/lib/constants/home-content";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  const { title, cta, image } = HOME_CONTENT.promo;

  return (
    <section className="relative w-full overflow-hidden bg-muted/40 md:py-16">
      <div className="container mx-auto flex max-w-7xl flex-col overflow-hidden bg-card shadow-2xl md:h-[500px] md:flex-row md:rounded-3xl">
        {/* Text Content */}
        <div className="flex flex-1 flex-col justify-center space-y-8 p-12 text-center md:items-start md:text-left">
          <h2 className="text-4xl font-serif font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl max-w-lg">
            {title}
          </h2>
          <Button
            size="lg"
            variant="default"
            className="group h-12 rounded-full px-8 text-base font-semibold bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          >
            {cta}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Banner Image */}
        <div className="relative flex-1 h-[400px] md:h-full overflow-hidden group">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-card/30 via-transparent to-transparent hidden md:block" />
        </div>
      </div>
    </section>
  );
}
