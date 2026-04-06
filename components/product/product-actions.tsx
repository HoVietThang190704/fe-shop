"use client";

import React, { useState } from "react";
import { ShoppingBag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/provider/CartProvider";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FavoriteToggleButton } from "@/components/favorites/favorite-toggle-button";

interface ProductActionsProps {
  productId: string;
  productName: string;
}

export function ProductActions({ productId, productName }: ProductActionsProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        <FavoriteToggleButton
          productId={productId}
          productName={productName}
          className="h-14 w-14 rounded-full border-border/60 hover:bg-muted/30"
        />
        <Button variant="outline" className="h-14 w-14 rounded-full border-border/60 hover:bg-muted/30 transition-all active:scale-90">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
