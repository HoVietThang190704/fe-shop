"use client";

import { Heart, Maximize2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/provider/AuthProvider";
import { useCart } from "@/provider/CartProvider";
import { useFavorite } from "@/provider/FavoriteProvider";

interface TrendingProductActionsProps {
  productId: string;
  productName: string;
}

export function TrendingProductActions({
  productId,
  productName,
}: TrendingProductActionsProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorite();
  const router = useRouter();

  const onAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to your cart", {
        description: "Redirecting you to the login page...",
      });
      setTimeout(() => router.push("/login"), 1200);
      return;
    }

    const success = await addToCart(productId);
    if (success) {
      toast.success(`'${productName}' added to cart`);
      return;
    }

    toast.error("Failed to add to cart");
  };

  const onToggleFavorite = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      toast.error("Please login to save favorites", {
        description: "Redirecting you to the login page...",
      });
      setTimeout(() => router.push("/login"), 1200);
      return;
    }

    const currentlyFavorite = isFavorite(productId);
    const success = await toggleFavorite(productId);

    if (success) {
      toast.success(
        currentlyFavorite
          ? "Removed from favorites"
          : "Added to favorites",
      );
      return;
    }

    toast.error("Could not update favorites");
  };

  return (
    <div className="absolute inset-x-4 bottom-4 flex translate-y-12 items-center justify-between space-x-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
      <button
        onClick={onAddToCart}
        className="flex h-11 flex-grow items-center justify-center rounded-full bg-white/95 text-black font-semibold text-sm shadow-xl backdrop-blur-md transition-all hover:bg-black hover:text-white active:scale-95"
      >
        Add to Cart
      </button>
      <div className="flex space-x-2">
        <button
          onClick={onToggleFavorite}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-black shadow-xl backdrop-blur-md transition-all hover:bg-primary hover:text-white active:scale-95"
          aria-label="Toggle favorite"
        >
          <Heart
            className={`h-4 w-4 ${isFavorite(productId) ? "fill-current text-red-500" : ""}`}
          />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-black shadow-xl backdrop-blur-md transition-all hover:bg-primary hover:text-white active:scale-95"
          aria-label="Quick view"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
