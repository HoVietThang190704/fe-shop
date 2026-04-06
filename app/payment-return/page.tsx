"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { OrderService } from "@/service/order.service";
import { CheckCircle2, XCircle, Loader2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/provider/CartProvider";
import Link from "next/link";

export default function PaymentReturnPage() {
  const searchParams = useSearchParams();
  const { refreshCart } = useCart();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [message, setMessage] = useState("");
  const [earnedPoints, setEarnedPoints] = useState<number>(0);

  useEffect(() => {
    const verify = async () => {
      // 1. COD: redirect thủ công với query ?success=true&orderId=xxx
      const isDirectSuccess = searchParams.get("success") === "true";
      const orderId = searchParams.get("orderId");
      const pointsFromQuery = Number(searchParams.get("earnedPoints") || 0);

      if (isDirectSuccess && orderId) {
        setStatus("success");
        setEarnedPoints(Number.isNaN(pointsFromQuery) ? 0 : pointsFromQuery);
        setMessage("Your order has been placed successfully. Thank you for shopping with us!");
        return;
      }

      // 2. MoMo: callback có tham số resultCode
      const resultCode = searchParams.get("resultCode");
      if (resultCode !== null) {
        // Gọi backend để xác nhận, xóa giỏ hàng và cập nhật đơn hàng
        // (cần thiết vì IPN không thể gọi localhost trong môi trường dev)
        const response = await OrderService.getInstance().confirmMoMoReturn(searchParams.toString());
        if (response.success) {
          await refreshCart(); // Đồng bộ lại giỏ hàng trên UI
          setStatus("success");
          const apiPoints = Number(response.earnedPoints ?? response.data?.earnedPoints ?? 0);
          setEarnedPoints(Number.isNaN(apiPoints) ? 0 : apiPoints);
          setMessage("Payment via MoMo successful! Your order is being processed.");
        } else {
          setStatus("failed");
          setMessage(response.message || `Payment was cancelled or failed (Code: ${resultCode}).`);
        }
        return;
      }

      // 3. Không có thông tin hợp lệ
      setStatus("failed");
      setMessage("Invalid order or payment session.");
    };

    verify();
  }, [searchParams, refreshCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-black text-center">
      <div className="max-w-md w-full p-12 rounded-[2rem] border border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-950/30 backdrop-blur-xl animate-in zoom-in duration-700">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin text-zinc-400 mb-6" size={48} strokeWidth={1} />
            <h2 className="text-xl font-black uppercase tracking-tighter italic mb-2">VERIFYING PAYMENT</h2>
            <p className="text-sm text-zinc-500 font-serif italic">Please wait while we confirm your transaction...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-500 mb-8 border border-emerald-200 dark:border-emerald-800 animate-in bounce-in duration-1000">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">PURCHASE SECURED</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-serif italic mb-10 px-4 leading-relaxed">
              {message}
            </p>
            {earnedPoints > 0 && (
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-8">
                Reward points earned: {earnedPoints.toLocaleString("vi-VN")}
              </p>
            )}
            <div className="flex flex-col gap-3 w-full">
              <Link
                href="/products"
                className="w-full h-14 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl shadow-zinc-200 dark:shadow-none"
              >
                Back to Collection
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/"
                className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors py-2"
              >
                Go to Homescreen
              </Link>
            </div>
          </div>
        )}

        {status === "failed" && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-red-500 mb-8 border border-red-200 dark:border-red-800">
              <XCircle size={32} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">PAYMENT ERROR</h2>
            <p className="text-sm text-zinc-500 font-serif italic mb-10 px-4 leading-relaxed">
              {message}
            </p>
            <div className="flex flex-col gap-3 w-full">
              <Link
                href="/checkout"
                className="w-full h-14 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all"
              >
                Retry Checkout
              </Link>
              <Link
                href="/cart"
                className="flex items-center justify-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors py-2"
              >
                <ShoppingBag size={14} />
                Return to Bag
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
