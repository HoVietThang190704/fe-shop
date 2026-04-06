"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreditCard, Truck, MapPin, Phone, User, CheckCircle2, Loader2, Wallet } from "lucide-react";
import { OrderInput, OrderService } from "@/service/order.service";
import { useCart } from "@/provider/CartProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CheckoutForm() {
  const { cartItems, cartTotal, refreshCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<OrderInput>({
    defaultValues: {
      paymentMethod: 'COD',
    }
  });

  const selectedPayment = watch("paymentMethod");

  const onSubmit = async (data: OrderInput) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Submitting order with data:", data);
      const response = await OrderService.getInstance().createOrder(data);
      console.log("Order creation response:", response);

      if (response && (response.success === true || response.data?.paymentUrl)) {
        toast.success(response.message || "Order placed successfully");
        
        if (data.paymentMethod === 'MOMO' && response.data?.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          // COD success
          await refreshCart();
          router.push(`/payment-return?orderId=${response.data?.orderId}&success=true`);
        }
      } else {
        console.error("Order creation failed:", response);
        toast.error(response?.message || "Failed to place order");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Shipping Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
            <Truck size={20} strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-tight italic">Shipping Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors" size={16} />
              <input
                {...register("shippingAddress.fullName", { required: "Name is required" })}
                className="w-full h-14 pl-12 pr-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl text-sm transition-all focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none"
                placeholder="Ex: John Doe"
              />
            </div>
            {errors.shippingAddress?.fullName && <p className="text-red-500 text-[10px] font-bold uppercase ml-1 italic">{errors.shippingAddress.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Phone Number</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors" size={16} />
              <input
                {...register("shippingAddress.phone", { required: "Phone is required" })}
                className="w-full h-14 pl-12 pr-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl text-sm transition-all focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none"
                placeholder="Ex: 0912345678"
              />
            </div>
            {errors.shippingAddress?.phone && <p className="text-red-500 text-[10px] font-bold uppercase ml-1 italic">{errors.shippingAddress.phone.message}</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Delivery Address</label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors" size={16} />
              <input
                {...register("shippingAddress.address", { required: "Address is required" })}
                className="w-full h-14 pl-12 pr-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl text-sm transition-all focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none"
                placeholder="House number, Street name..."
              />
            </div>
            {errors.shippingAddress?.address && <p className="text-red-500 text-[10px] font-bold uppercase ml-1 italic">{errors.shippingAddress.address.message}</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">City / Province</label>
            <input
              {...register("shippingAddress.city", { required: "City is required" })}
              className="w-full h-14 px-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-2xl text-sm transition-all focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none"
              placeholder="Ex: Ho Chi Minh City"
            />
            {errors.shippingAddress?.city && <p className="text-red-500 text-[10px] font-bold uppercase ml-1 italic">{errors.shippingAddress.city.message}</p>}
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
            <CreditCard size={20} strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-tight italic">Payment Method</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* COD Option */}
          <div 
            onClick={() => setValue("paymentMethod", "COD")}
            className={cn(
              "relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between h-32",
              selectedPayment === "COD" 
                ? "border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 shadow-lg" 
                : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-black grayscale opacity-60 hover:opacity-100"
            )}
          >
            <div className="flex justify-between items-start">
              <Truck size={24} strokeWidth={1.5} />
              {selectedPayment === "COD" && <CheckCircle2 size={20} className="text-zinc-900 dark:text-zinc-100" />}
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-widest">Cash on Delivery</p>
              <p className="text-[10px] text-zinc-500 font-medium">Pay when you receive</p>
            </div>
          </div>

          {/* MOMO Option */}
          <div 
            onClick={() => setValue("paymentMethod", "MOMO")}
            className={cn(
              "relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between h-32",
              selectedPayment === "MOMO" 
                ? "border-[#ae2070] bg-pink-50 dark:bg-pink-950/20 shadow-lg" 
                : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-black grayscale opacity-60 hover:opacity-100"
            )}
          >
            <div className="flex justify-between items-start">
              <Wallet size={24} strokeWidth={1.5} className={selectedPayment === "MOMO" ? "text-[#ae2070]" : ""} />
              {selectedPayment === "MOMO" && <CheckCircle2 size={20} className="text-[#ae2070]" />}
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-widest">MoMo Wallet</p>
              <p className="text-[10px] text-zinc-500 font-medium italic">Pay via MoMo e-wallet</p>
            </div>
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-16 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-zinc-200 dark:shadow-none flex items-center justify-center gap-3 italic"
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "COMPLETE PURCHASE"}
      </button>
    </form>
  );
}
