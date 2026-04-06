"use client";

import Link from "next/link";
import { Heart, Loader2, Sparkles, ShoppingBag } from "lucide-react";
import { useFavorite } from "@/provider/FavoriteProvider";
import { FavoriteItemCard } from "@/components/favorites/favorite-item-card";

export default function FavoritesPage() {
  const { favorites, favoriteCount, isLoading } = useFavorite();

  if (isLoading && favorites.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-3 text-zinc-500">
        <Loader2 className="h-7 w-7 animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest">Loading favorites...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <section className="min-h-[80vh] bg-gradient-to-b from-zinc-50 via-white to-zinc-100 px-6 pb-20 pt-28 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="relative mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <Heart className="h-9 w-9 text-zinc-400" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight">Your favorites is empty</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Save the products you love to revisit them anytime. Start building your curated menswear collection now.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-zinc-900 px-7 text-xs font-bold uppercase tracking-widest text-zinc-100 transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Sparkles className="h-4 w-4" />
            Discover products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-zinc-50/60 px-6 pb-20 pt-24 dark:bg-zinc-950/40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            <Heart className="h-3.5 w-3.5 fill-current text-red-500" />
            Favorite products
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">My Wishlist</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {favoriteCount} {favoriteCount === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((product) => (
            <FavoriteItemCard key={product._id} product={product} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/cart"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 text-xs font-bold uppercase tracking-widest text-zinc-800 transition-colors hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-200 dark:hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            Go to cart
          </Link>
        </div>
      </div>
    </section>
  );
}
