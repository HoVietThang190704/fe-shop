import { BaseResponse } from "@/lib/interface/baseresponse";
import { Product } from "@/lib/interface/product.interface";
import { TokenManager } from "@/lib/token-client";
import { tokenType } from "@/lib/token";
import { Endpoint } from "@/lib/shared/constants/endpoint";
import { UrlBuilder } from "@/lib/urlbuilder";

export class FavoriteService {
  private static instance: FavoriteService;

  private constructor() {}

  public static getInstance(): FavoriteService {
    if (!FavoriteService.instance) {
      FavoriteService.instance = new FavoriteService();
    }
    return FavoriteService.instance;
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

  async getFavorites(): Promise<BaseResponse<Product[]>> {
    try {
      const url = new UrlBuilder().addPath(Endpoint.FAVORITES).build();
      const headers = await this.getAuthHeaders();
      const response = await fetch(url, {
        method: "GET",
        headers,
        cache: "no-store",
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return { success: false, message: "Failed to fetch favorites" };
    }
  }

  async addToFavorites(productId: string): Promise<BaseResponse<Product[]>> {
    try {
      const url = new UrlBuilder()
        .addPath(Endpoint.FAVORITES)
        .addParam("add")
        .build();
      const headers = await this.getAuthHeaders();
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ product: productId }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error adding favorite:", error);
      return { success: false, message: "Failed to add favorite" };
    }
  }

  async removeFromFavorites(productId: string): Promise<BaseResponse<Product[]>> {
    try {
      const url = new UrlBuilder()
        .addPath(Endpoint.FAVORITES)
        .addParam("remove")
        .build();
      const headers = await this.getAuthHeaders();
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ product: productId }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error removing favorite:", error);
      return { success: false, message: "Failed to remove favorite" };
    }
  }

  async toggleFavorite(productId: string): Promise<BaseResponse<Product[]>> {
    try {
      const url = new UrlBuilder()
        .addPath(Endpoint.FAVORITES)
        .addParam("toggle")
        .build();
      const headers = await this.getAuthHeaders();
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ product: productId }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return { success: false, message: "Failed to toggle favorite" };
    }
  }
}
