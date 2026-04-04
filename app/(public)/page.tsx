import React from "react";
import { HeroSection } from "@/components/home/hero-section";
import { EssentialsSection } from "@/components/home/essentials-section";
import { PromoBanner } from "@/components/home/promo-banner";
import { TrendingSection } from "@/components/home/trending-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Essentials Category Grid */}
      <EssentialsSection />

      {/* Seasonal Promo Banner */}
      <PromoBanner />

      {/* Trending Products Section */}
      <TrendingSection />

      {/* Extra info / Social Proof / Quality Guarantee dummy etc. */}
      <section className="bg-muted py-24 md:py-32">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 text-center md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 transition-transform hover:scale-105">
            <div className="bg-primary/10 p-5 rounded-full shadow-inner ring-1 ring-primary/20">
              <span className="text-2xl font-bold text-primary">01</span>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest text-foreground">Premium Quality</h3>
            <p className="text-sm font-medium text-muted-foreground/80 transition-colors hover:text-foreground">
              We sourcing only the finest fabrics from world-renowned mills for our collections.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 transition-transform hover:scale-105">
            <div className="bg-primary/10 p-5 rounded-full shadow-inner ring-1 ring-primary/20">
               <span className="text-2xl font-bold text-primary">02</span>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest text-foreground">Modern Tailoring</h3>
            <p className="text-sm font-medium text-muted-foreground/80 transition-colors hover:text-foreground">
              Every piece is meticulously crafted with modern silhouettes and timeless details.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 transition-transform hover:scale-105">
            <div className="bg-primary/10 p-5 rounded-full shadow-inner ring-1 ring-primary/20">
               <span className="text-2xl font-bold text-primary">03</span>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest text-foreground">Global Delivery</h3>
            <p className="text-sm font-medium text-muted-foreground/80 transition-colors hover:text-foreground">
              Fast, reliable shipping worldwide so you can define your style anywhere.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
