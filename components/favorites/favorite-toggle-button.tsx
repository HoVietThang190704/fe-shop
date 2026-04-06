"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/provider/AuthProvider";
import { useFavorites } from "@/provider/FavoriteProvider";

interface FavoriteToggleButtonProps {
  productId: string;
  productName: string;
  className?: string;
  showLabel?: boolean;
}

export function FavoriteToggleButton({
  productId,
  productName,
  className,
  showLabel = false,
}: FavoriteToggleButtonProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const active = isFavorite(productId);

  const handleToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      toast.error("Please login to manage your favorites", {
        description: "Redirecting you to the login page...",
      });
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    setPending(true);
    const wasFavorite = active;
    const success = await toggleFavorite(productId);
    setPending(false);

    if (!success) {
      toast.error("Failed to update favorites", {
        description: "Please try again later.",
      });
      return;
    }

    if (wasFavorite) {
      toast.success(`Removed '${productName}' from favorites`);
    } else {
      toast.success(`Added '${productName}' to favorites`);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleToggle}
      disabled={pending}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      className={cn(
        "transition-all active:scale-90",
        active && "border-rose-500/60 text-rose-500 hover:bg-rose-500/10",
        className,
      )}
    >
      <Heart className={cn("h-5 w-5", active && "fill-current")} />
      {showLabel && (pending ? "Saving..." : active ? "Favorited" : "Favorite")}
    </Button>
  );
}
