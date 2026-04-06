import { BaseResponse } from "@/lib/interface/baseresponse";
import { User } from "@/lib/interface/user.interface";
import { Endpoint } from "@/lib/shared/constants/endpoint";
import { UrlBuilder } from "@/lib/urlbuilder";

export class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async updateProfile(formData: FormData, token: string): Promise<BaseResponse<User>> {
    try {
      const url = new UrlBuilder()
        .addPath(Endpoint.USERS)
        .addParam("profile")
        .build();

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: formData,
      });

      const payload = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: payload.message || "Profile updated successfully.",
          data: payload.data,
        };
      }

      return {
        success: false,
        message: payload.message || "Update failed.",
      };
    } catch (error) {
      console.error("Error during profile update:", error);
      return {
        message: "Update failed due to network error.",
        success: false,
      };
    }
  }
}
