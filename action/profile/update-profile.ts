"use server";

import { UserService } from "@/service/user.service";
import { TokenManager } from "@/lib/token-server";
import { tokenType } from "@/lib/token";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const token = await TokenManager.getToken(tokenType.ACCESS);
  if (!token) {
    return { success: false, message: "Token not found" };
  }

  const response = await UserService.getInstance().updateProfile(formData, token);
  
  if (response.success) {
    revalidatePath("/myprofile");
  }
  
  return response;
}
