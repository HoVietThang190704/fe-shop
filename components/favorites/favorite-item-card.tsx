"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/interface/product.interface";
import { useFavorite } from "@/provider/FavoriteProvider";
import { useCart } from "@/provider/CartProvider";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FavoriteItemCardProps {
  product: Product;
}

export function FavoriteItemCard({ product }: FavoriteItemCardProps) {
  const { removeFromFavorites } = useFavorite();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleRemove = async () => {
    const success = await removeFromFavorites(product._id);
    if (!success) {
      toast.error("Failed to remove from favorites");
      return;
    }
    toast.success("Removed from favorites");
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to your cart", {
        description: "Redirecting you to the login page...",
      });
      setTimeout(() => router.push("/login"), 1200);
      return;
    }

    const success = await addToCart(product._id);
    if (success) {
      toast.success(`'${product.title}' added to cart`);
      return;
    }

    toast.error("Failed to add to cart");
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={product.images[0] || "https://placehold.co/600x750"}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            {product.category?.name || "Collection"}
          </p>
          <Link href={`/product/${product.slug}`} className="mt-2 block">
            <h3 className="line-clamp-1 text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            ${product.price}
          </p>
          <button
            onClick={handleRemove}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:border-red-500 hover:text-red-500 dark:border-zinc-700 dark:text-zinc-200"
            aria-label="Remove from favorites"
          >
            <Heart className="h-4 w-4 fill-current" />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-900 text-xs font-bold uppercase tracking-widest text-zinc-100 transition-all hover:bg-zinc-800 active:scale-[0.99] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
