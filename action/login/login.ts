"use server";

import { AuthService } from "@/service/auth.service";
import { TokenManager, tokenType } from "@/lib/token";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const response = await AuthService.getInstance().login(username, password);
  console.log("Login response:", response);

  if (response.success && response.data?.token) {
    await TokenManager.setToken(tokenType.ACCESS, response.data.token);
    redirect("/");
  }
}