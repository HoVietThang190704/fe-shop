"use client";

import React, { useState } from "react";
import { ShoppingBag, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/provider/CartProvider";
import { useAuth } from "@/provider/AuthProvider";
import { useFavorite } from "@/provider/FavoriteProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
  productId: string;
  productName: string;
}

export function ProductActions({ productId, productName }: ProductActionsProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorite();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to your cart", {
        description: "Redirecting you to the login page...",
      });
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    setLoading(true);
    const success = await addToCart(productId);
    setLoading(false);

    if (success) {
      toast.success(`'${productName}' added to cart`, {
        description: "Your bag has been updated.",
      });
    } else {
      toast.error("Failed to add to cart", {
        description: "Please try again later.",
      });
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error("Please login to save favorites", {
        description: "Redirecting you to the login page...",
      });
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    const currentlyFavorite = isFavorite(productId);
    setFavoriteLoading(true);
    const success = currentlyFavorite
      ? await removeFromFavorites(productId)
      : await addToFavorites(productId);
    setFavoriteLoading(false);

    if (success) {
      toast.success(
        currentlyFavorite ? "Removed from favorites" : "Added to favorites",
      );
      return;
    }

    toast.error("Failed to update favorite status", {
      description: "Please try again later.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-3">
        <Button 
          onClick={handleAddToCart}
          disabled={loading}
          className="flex-grow h-14 rounded-full text-sm font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-70"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {loading ? "Adding..." : "Add to Cart"}
        </Button>
        <Button
          variant="outline"
          onClick={handleToggleFavorite}
          disabled={favoriteLoading}
          className="h-14 w-14 rounded-full border-border/60 hover:bg-muted/30 transition-all active:scale-90"
        >
          <Heart className={`h-5 w-5 ${isFavorite(productId) ? "fill-current text-red-500" : ""}`} />
        </Button>
        <Button variant="outline" className="h-14 w-14 rounded-full border-border/60 hover:bg-muted/30 transition-all active:scale-90">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
