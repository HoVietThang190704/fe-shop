"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/lib/interface/cart.interface";
import { Product } from "@/lib/interface/product.interface";
import { useCart } from "@/provider/CartProvider";
import { useCallback } from "react";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, decreaseQuantity, addToCart, removeFromCart } = useCart();
  const product = item.product as Product;

  const handleIncrease = useCallback(() => {
    addToCart(product._id);
  }, [product._id, addToCart]);

  const handleDecrease = useCallback(() => {
    decreaseQuantity(product._id);
  }, [product._id, decreaseQuantity]);

  const handleRemove = useCallback(() => {
    removeFromCart(product._id);
  }, [product._id, removeFromCart]);

  if (typeof product === "string") {
    return (
      <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-20 h-24 bg-zinc-100 dark:bg-zinc-800 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-24 bg-zinc-100 dark:bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-center gap-4 py-6 border-b border-zinc-100 dark:border-zinc-800 transition-all duration-300">
      {/* Product Image */}
      <div className="relative w-24 h-32 flex-shrink-0 bg-zinc-50 dark:bg-zinc-900 rounded-sm overflow-hidden border border-zinc-100 dark:border-zinc-800">
        <Image
          src={product.images[0] || "https://i.imgur.com/R3iobJA.jpeg"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow flex flex-col justify-between h-32 py-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
              {product.title}
            </h3>
            <p className="text-xs text-zinc-500 mt-1 font-mono uppercase tracking-widest">
              {product.sku}
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="text-zinc-400 hover:text-red-500 transition-colors p-1"
            aria-label="Remove item"
          >
            <Trash2 size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex justify-between items-end">
          {/* Quantity Controls */}
          <div className="flex items-center border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-black rounded-full p-1 shadow-sm">
            <button
              onClick={handleDecrease}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} strokeWidth={2} />
            </button>
            <span className="w-8 text-center text-xs font-semibold select-none tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="text-sm font-semibold tracking-tight tabular-nums">
              {(product.price * item.quantity).toLocaleString("vi-VN")}
              <span className="text-[10px] ml-0.5">₫</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
