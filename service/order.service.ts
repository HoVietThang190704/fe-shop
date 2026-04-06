import { BaseResponse } from "@/lib/interface/baseresponse";
import { Endpoint } from "@/lib/shared/constants/endpoint";
import { UrlBuilder } from "@/lib/urlbuilder";
import { TokenManager } from "@/lib/token-client";
import { tokenType } from "@/lib/token";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
}

export interface OrderInput {
  shippingAddress: ShippingAddress;
  paymentMethod: 'COD' | 'MOMO';
}

export class OrderService {
  private static instance: OrderService;

  private constructor() {}

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
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

  async createOrder(orderData: OrderInput): Promise<BaseResponse<{ paymentUrl?: string; orderId: string }>> {
    try {
      const url = new UrlBuilder().addPath(Endpoint.ORDERS || '/api/v1/orders').build();
      const headers = await this.getAuthHeaders();
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(orderData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating order:", error);
      return { success: false, message: "Failed to create order" };
    }
  }

  /**
   * Gọi backend để xác nhận kết quả thanh toán MoMo sau khi redirect về.
   * Endpoint này sẽ xóa giỏ hàng và cập nhật trạng thái đơn hàng.
   */
  async confirmMoMoReturn(queryParams: string): Promise<BaseResponse<{ orderId: string }>> {
    try {
      const url = `${new UrlBuilder().addPath(Endpoint.ORDERS || '/api/v1/orders').build()}/momo-return?${queryParams}`;
      const headers = await this.getAuthHeaders();
      const response = await fetch(url, { method: "GET", headers });
      return await response.json();
    } catch (error) {
      console.error("Error confirming MoMo payment:", error);
      return { success: false, message: "Failed to confirm MoMo payment" };
    }
  }

  async getOrders(): Promise<BaseResponse<any[]>> {
    try {
      const url = new UrlBuilder().addPath(Endpoint.ORDERS || '/api/v1/orders').build();
      const headers = await this.getAuthHeaders();
      const response = await fetch(url, {
        method: "GET",
        headers,
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { success: false, message: "Failed to fetch orders" };
    }
  }
}
