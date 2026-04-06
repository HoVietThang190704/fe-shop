import React from "react";
import { FavoritesPageContent } from "@/components/favorites/favorites-page-content";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <main className="container mx-auto max-w-7xl px-6 pt-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              My list
            </p>
            <h1 className="font-serif text-4xl tracking-tight md:text-5xl">
              Favorite Products
            </h1>
          </div>
        </div>

        <FavoritesPageContent />
      </main>
    </div>
  );
}
