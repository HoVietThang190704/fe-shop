"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/provider/AuthProvider";
import { RewardService, RewardVoucher } from "@/service/reward.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemPoints, setRedeemPoints] = useState("1000");
  const [points, setPoints] = useState(0);
  const [vouchers, setVouchers] = useState<RewardVoucher[]>([]);

  const activeVouchers = useMemo(
    () => vouchers.filter((voucher) => voucher.status === "active"),
    [vouchers]
  );

  useEffect(() => {
    const loadRewards = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      if (typeof user.rewardPoints === "number") {
        setPoints(user.rewardPoints);
      }

      setLoading(true);
      try {
        const summaryRes = await RewardService.getInstance().getSummary();
        if (summaryRes.success && summaryRes.data) {
          setPoints(summaryRes.data.rewardPoints || 0);
          setVouchers(summaryRes.data.vouchers || []);
        }
      } finally {
        setLoading(false);
      }
    };

    loadRewards();
  }, [user]);

  const handleRedeem = async () => {
    const normalizedPoints = Number(redeemPoints);
    if (!Number.isInteger(normalizedPoints) || normalizedPoints <= 0) {
      toast.error("Points must be a positive integer");
      return;
    }

    setIsRedeeming(true);
    try {
      const response = await RewardService.getInstance().redeem(normalizedPoints);
      if (!response.success || !response.data) {
        toast.error(response.message || "Redeem failed");
        return;
      }

      toast.success(`Voucher ${response.data.voucherCode} created`);
      setPoints(response.data.pointsLeft);

      const vouchersRes = await RewardService.getInstance().getVouchers();
      if (vouchersRes.success && vouchersRes.data) {
        setVouchers(vouchersRes.data);
      }
    } finally {
      setIsRedeeming(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-32 px-6">
        <div className="max-w-3xl mx-auto border border-zinc-100 dark:border-zinc-900 rounded-2xl p-8 bg-zinc-50/40 dark:bg-zinc-950/30">
          <h1 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Profile</h1>
          <p className="text-sm text-zinc-500 mb-6">Please login to view your profile and rewards.</p>
          <Link
            href="/login"
            className="inline-flex h-11 px-6 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-bold uppercase tracking-widest"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-28 pb-16 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="border-b border-zinc-100 dark:border-zinc-900 pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">My Profile</h1>
          <p className="text-sm text-zinc-500 mt-2">Account details, reward points and your vouchers.</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-6 bg-zinc-50/30 dark:bg-zinc-950/30">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-5">Account</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-zinc-500">Full name</p>
                <p className="font-semibold">{user.fullName || "-"}</p>
              </div>
              <div>
                <p className="text-zinc-500">Username</p>
                <p className="font-semibold">{user.username}</p>
              </div>
              <div>
                <p className="text-zinc-500">Email</p>
                <p className="font-semibold break-all">{user.email}</p>
              </div>
              <div>
                <p className="text-zinc-500">Status</p>
                <p className="font-semibold">{user.status ? "Active" : "Inactive"}</p>
              </div>
            </div>
          </div>

          <div className="border border-zinc-100 dark:border-zinc-900 rounded-2xl p-6 bg-zinc-50/30 dark:bg-zinc-950/30">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-5">Reward Points</h2>
            {loading ? (
              <div className="h-20 flex items-center justify-center text-zinc-500">
                <Loader2 className="animate-spin" size={18} />
              </div>
            ) : (
              <>
                <p className="text-4xl font-black tracking-tight tabular-nums">{points.toLocaleString("vi-VN")}</p>
                <p className="text-xs text-zinc-500 mt-2">1 point = 1 VND discount</p>
                <div className="mt-5 space-y-2">
                  <label className="text-[11px] font-semibold text-zinc-500">Redeem points</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={1000}
                      step={1000}
                      value={redeemPoints}
                      onChange={(e) => setRedeemPoints(e.target.value)}
                      className="h-10 flex-1 px-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleRedeem}
                      disabled={isRedeeming}
                      className="h-10 px-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[11px] font-bold uppercase tracking-widest disabled:opacity-50"
                    >
                      {isRedeeming ? "..." : "Redeem"}
                    </button>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="inline-flex mt-5 h-10 px-5 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-[11px] font-bold uppercase tracking-widest"
                >
                  Use Voucher at Checkout
                </Link>
              </>
            )}
          </div>
        </section>

        <section className="border border-zinc-100 dark:border-zinc-900 rounded-2xl p-6 bg-zinc-50/30 dark:bg-zinc-950/30">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-black uppercase tracking-[0.2em]">My Vouchers</h2>
            <span className="text-xs text-zinc-500">Active: {activeVouchers.length}</span>
          </div>

          {loading ? (
            <div className="h-24 flex items-center justify-center text-zinc-500">
              <Loader2 className="animate-spin" size={18} />
            </div>
          ) : vouchers.length === 0 ? (
            <p className="text-sm text-zinc-500">No voucher yet. Redeem reward points to create vouchers.</p>
          ) : (
            <div className="space-y-3">
              {vouchers.map((voucher) => (
                <div
                  key={voucher.code}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-bold tracking-widest text-sm">{voucher.code}</p>
                    <span className="text-[11px] uppercase font-bold tracking-widest text-zinc-500">
                      {voucher.status}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-2 flex items-center justify-between">
                    <span>Discount: {voucher.discountAmount.toLocaleString("vi-VN")} VND</span>
                    <span>Expires: {new Date(voucher.expiresAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
