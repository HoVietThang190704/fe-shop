import { BaseResponse } from "@/lib/interface/baseresponse";
import { Endpoint } from "@/lib/shared/constants/endpoint";
import { tokenType } from "@/lib/token";
import { TokenManager } from "@/lib/token-client";
import { UrlBuilder } from "@/lib/urlbuilder";

export interface RewardVoucher {
  code: string;
  pointsCost: number;
  discountAmount: number;
  status: "active" | "locked" | "redeemed" | "expired";
  expiresAt: string;
  redeemedAt?: string;
  createdAt: string;
}

export interface RewardSummary {
  rewardPoints: number;
  conversion: string;
  minRedeemPoints: number;
  vouchers: RewardVoucher[];
}

export class RewardService {
  private static instance: RewardService;

  private constructor() {}

  public static getInstance(): RewardService {
    if (!RewardService.instance) {
      RewardService.instance = new RewardService();
    }
    return RewardService.instance;
  }

  private async getAuthHeaders() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (typeof window === "undefined") {
      const token = await TokenManager.getToken(tokenType.ACCESS);
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async getSummary(): Promise<BaseResponse<RewardSummary>> {
    try {
      const url = new UrlBuilder().addPath(Endpoint.REWARDS).addParam("summary").build();
      const headers = await this.getAuthHeaders();
      const response = await fetch(url, {
        method: "GET",
        headers,
        credentials: "include",
        cache: "no-store",
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching reward summary:", error);
      return { success: false, message: "Failed to fetch reward summary" };
    }
  }

  async redeem(points: number): Promise<BaseResponse<{
    voucherCode: string;
    discountAmount: number;
    pointsUsed: number;
    pointsLeft: number;
    expiresAt: string;
  }>> {
    try {
      const url = new UrlBuilder().addPath(Endpoint.REWARDS).addParam("redeem").build();
      const headers = await this.getAuthHeaders();
      const response = await fetch(url, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({ points }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error redeeming reward points:", error);
      return { success: false, message: "Failed to redeem reward points" };
    }
  }

  async getVouchers(): Promise<BaseResponse<RewardVoucher[]>> {
    try {
      const url = new UrlBuilder().addPath(Endpoint.REWARDS).addParam("vouchers").build();
      const headers = await this.getAuthHeaders();
      const response = await fetch(url, {
        method: "GET",
        headers,
        credentials: "include",
        cache: "no-store",
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      return { success: false, message: "Failed to fetch vouchers" };
    }
  }
}
