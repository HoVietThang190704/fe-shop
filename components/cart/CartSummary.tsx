"use client";

import { ShoppingBag, ChevronRight } from "lucide-react";
import { useCart } from "@/provider/CartProvider";
import { useMemo } from "react";
import Link from "next/link";

export default function CartSummary() {
  const { cartTotal, cartItems } = useCart();

  const tax = useMemo(() => cartTotal * 0.1, [cartTotal]);
  const total = useMemo(() => cartTotal + tax, [cartTotal, tax]);

  if (cartItems.length === 0) return null;

  return (
    <div className="lg:sticky lg:top-24 h-fit border border-zinc-100 dark:border-zinc-800 rounded-lg p-6 bg-white dark:bg-black shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)]">
      <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
        <ShoppingBag size={20} strokeWidth={1.5} />
        Order Summary
      </h2>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 font-medium">Subtotal</span>
          <span className="font-semibold tabular-nums">
            {cartTotal.toLocaleString("vi-VN")}
            <span className="text-[10px] ml-0.5 font-normal tracking-tight">₫</span>
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 font-medium">VAT (10%)</span>
          <span className="font-semibold tabular-nums">
            {tax.toLocaleString("vi-VN")}
            <span className="text-[10px] ml-0.5 font-normal tracking-tight">₫</span>
          </span>
        </div>

        <div className="pt-4 mt-4 border-t border-dashed border-zinc-100 dark:border-zinc-800 flex justify-between items-end">
          <span className="text-base font-bold uppercase tracking-widest">Total</span>
          <span className="text-2xl font-black tabular-nums tracking-tighter">
            {total.toLocaleString("vi-VN")}
            <span className="text-xs font-normal ml-1 tracking-tight">₫</span>
          </span>
        </div>
      </div>

      <Link 
        href="/checkout"
        className="w-full h-14 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-zinc-200 dark:shadow-none"
      >
        Proceed to Checkout
        <ChevronRight size={16} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
      </Link>

      <div className="mt-6 flex items-center justify-center gap-4 border-t border-zinc-50 dark:border-zinc-900 pt-6 opacity-30 grayscale hover:opacity-80 transition-opacity">
        <div className="w-8 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
        <div className="w-8 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
        <div className="w-8 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
      </div>
    </div>
  );
}
