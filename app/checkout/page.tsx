"use client";

import { useCart } from "@/provider/CartProvider";
import CheckoutForm from "@/components/cart/CheckoutForm";
import CartItem from "@/components/cart/CartItem";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { cartItems, cartTotal, isLoading } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && cartItems.length === 0) {
      router.push("/cart");
    }
  }, [isLoading, cartItems, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-zinc-500">
        <p className="text-xs uppercase font-bold tracking-widest animate-pulse italic">Preparing Checkout...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="relative pt-24 pb-8 px-6 lg:px-12 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto flex flex-col items-start gap-4">
          <Link href="/cart" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Review Bag</span>
          </Link>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">CHECKOUT</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 lg:grid lg:grid-cols-12 gap-16 lg:gap-24 relative">
        {/* Checkout Form Column */}
        <div className="lg:col-span-7 xl:col-span-8">
          <CheckoutForm />
        </div>

        {/* Order Summary Column (Sticky) */}
        <div className="lg:col-span-5 xl:col-span-4 mt-20 lg:mt-0 relative group">
          <div className="absolute -inset-4 bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-5 transition-opacity" />
          
          <div className="sticky top-32 h-fit border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 bg-white dark:bg-black shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)]">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-10 pb-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center gap-2 italic">
              <ShoppingBag size={14} className="text-zinc-400" />
              Your Selection
            </h3>

            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4">
                   <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-tight line-clamp-1 italic">{typeof item.product === 'object' ? item.product.title : 'Loading...'}</span>
                      <span className="text-[10px] text-zinc-500 font-mono italic">Qty: {item.quantity}</span>
                   </div>
                   <span className="text-xs font-bold tabular-nums">
                     {((typeof item.product === 'object' ? item.product.price : 0) * item.quantity).toLocaleString('vi-VN')}₫
                   </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-dashed border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500 font-medium">Subtotal</span>
                <span className="font-bold tabular-nums">{cartTotal.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500 font-medium">VAT (10%)</span>
                <span className="font-bold tabular-nums italic">{(cartTotal * 0.1).toLocaleString('vi-VN')}₫</span>
              </div>
              
              <div className="pt-6 flex justify-between items-end">
                <span className="text-base font-black uppercase tracking-widest italic">TOTAL</span>
                <div className="text-right flex flex-col items-end">
                  <span className="text-3xl font-black tabular-nums tracking-tighter italic">
                    {(cartTotal * 1.1).toLocaleString('vi-VN')}
                    <span className="text-xs ml-1">₫</span>
                  </span>
                  <span className="text-[8px] text-zinc-400 uppercase font-bold tracking-widest mt-1">Inclusive of all taxes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
