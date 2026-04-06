"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/provider/AuthProvider";
import { useCart } from "@/provider/CartProvider";
import { useFavorites } from "@/provider/FavoriteProvider";

export function FavoritesPageContent() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { favorites, isLoading, removeFromFavorites } = useFavorites();
  const router = useRouter();

  const handleAddToCart = async (productId: string, productName: string) => {
    if (!user) {
      toast.error("Please login to add items to your cart", {
        description: "Redirecting you to the login page...",
      });
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    const success = await addToCart(productId);
    if (success) {
      toast.success(`'${productName}' added to cart`);
    } else {
      toast.error("Failed to add to cart", {
        description: "Please try again later.",
      });
    }
  };

  const handleRemoveFavorite = async (productId: string, productName: string) => {
    if (!user) {
      toast.error("Please login to manage your favorites", {
        description: "Redirecting you to the login page...",
      });
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    const success = await removeFromFavorites(productId);
    if (success) {
      toast.success(`Removed '${productName}' from favorites`);
    } else {
      toast.error("Failed to remove favorite", {
        description: "Please try again later.",
      });
    }
  };

  if (!user) {
    return (
      <Empty className="border border-dashed border-border/60 rounded-3xl p-12 bg-muted/10">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Heart className="size-4" />
          </EmptyMedia>
          <EmptyTitle>Login Required</EmptyTitle>
          <EmptyDescription>
            Please login to view and manage your favorite products.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <Empty className="border border-dashed border-border/60 rounded-3xl p-12 bg-muted/10">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Heart className="size-4" />
          </EmptyMedia>
          <EmptyTitle>Your favorites are empty</EmptyTitle>
          <EmptyDescription>
            Save products you love and come back to them anytime.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/">Explore Products</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {favorites.map((product) => (
        <article
          key={product._id}
          className="group overflow-hidden rounded-3xl border border-border/50 bg-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          <Link href={`/product/${product.slug}`} className="block">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted/20">
              <Image
                src={product.images[0] || "https://placehold.co/600x800"}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>

          <div className="space-y-4 p-5">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {product.category?.name || "Collection"}
              </p>
              <Link
                href={`/product/${product.slug}`}
                className="line-clamp-1 text-base font-bold tracking-tight hover:text-primary"
              >
                {product.title}
              </Link>
              <p className="text-lg font-bold">${product.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleAddToCart(product._id, product.title)}
                className="h-10 flex-1 rounded-full"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemoveFavorite(product._id, product.title)}
                className="h-10 w-10 rounded-full border-rose-500/40 text-rose-500 hover:bg-rose-500/10"
                aria-label="Remove from favorites"
              >
                <Heart className="h-4 w-4 fill-current" />
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
