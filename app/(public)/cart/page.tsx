"use client";

import { useCart } from "@/provider/CartProvider";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { ShoppingBag, ArrowLeft, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, isLoading, cartCount } = useCart();

  if (isLoading && cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-zinc-500 animate-in fade-in duration-500">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p className="text-sm font-medium uppercase tracking-widest">Updating Cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-zinc-50/50 dark:bg-zinc-950/50 animate-in zoom-in-95 duration-500">
        <div className="relative mb-8">
          <ShoppingBag size={80} strokeWidth={1} className="text-zinc-200 dark:text-zinc-800" />
          <div className="absolute inset-0 flex items-center justify-center scale-75 opacity-20">
            <ShoppingBag size={80} strokeWidth={1} />
          </div>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">YOUR BAG IS EMPTY</h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm text-center mb-8 text-sm leading-relaxed tracking-tight">
          Looks like you haven't added anything to your cart yet. Discover our latest menswear essentials and elevate your style today.
        </p>
        <Link
          href="/products"
          className="group relative h-12 px-8 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 shadow-md shadow-zinc-200 dark:shadow-none"
        >
          Explore Collection
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
      {/* Hero Header */}
      <div className="relative pt-24 pb-12 px-6 lg:px-12 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 scale-y-110 origin-bottom-left italic">
              SHOPPING BAG
            </h1>
            <p className="text-zinc-400 dark:text-zinc-500 text-xs font-mono tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {cartCount} {cartCount === 1 ? "Item" : "Items"} in your selection
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
          {/* Cart Items Column */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-2">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-900 mb-4 opacity-50">
              <span className="text-[10px] font-bold uppercase tracking-widest">Product Details</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Subtotal</span>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {cartItems.map((item, idx) => (
                <CartItem key={`${item.product}-${idx}`} item={item} />
              ))}
            </div>

            {/* Loyalty/Promo Info */}
            <div className="mt-20 p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 italic">The Menswear Promise</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-serif tracking-tight pr-12 italic">
                Quality is our hallmark. Every piece in your bag is crafted with precision and premium materials.
                Enjoy free standard shipping on orders over 500.000₫.
              </p>
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-5 xl:col-span-4 relative group">
            <div className="absolute -inset-4 bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-5 transition-opacity" />
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
