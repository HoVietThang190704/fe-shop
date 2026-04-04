import React from "react";
import Image from "next/image";
import { HOME_CONTENT } from "@/lib/constants/home-content";

export function EssentialsSection() {
  const { title, categories } = HOME_CONTENT.essentials;

  return (
    <section className="container mx-auto max-w-7xl px-6 py-24 md:py-32">
      {/* Section Header */}
      <div className="mb-16 flex items-center space-x-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
          {title}
        </h2>
        <div className="h-[1px] flex-grow bg-border/60" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group cursor-pointer space-y-4 transition-all"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted/30 shadow-sm transition-transform duration-500 hover:shadow-xl hover:-translate-y-2 group-hover:scale-[1.02]">
              <Image
                src={category.image}
                alt={category.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-95"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            </div>

            {/* Label */}
            <div className="flex flex-col items-center">
               <span className="text-center text-sm font-semibold tracking-tight text-foreground transition-all group-hover:text-primary group-hover:tracking-wide">
                {category.label}
              </span>
              <div className="h-[1.5px] w-0 bg-primary transition-all duration-300 group-hover:w-1/2 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
