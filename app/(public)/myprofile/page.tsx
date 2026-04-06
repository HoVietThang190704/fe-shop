import React from "react";
import { TokenManager } from "@/lib/token-server";
import { tokenType } from "@/lib/token";
import { AuthService } from "@/service/auth.service";
import { ProfilePageClient } from "@/components/profile/profile-client";
import { redirect } from "next/navigation";

export default async function MyProfilePage() {
  const token = await TokenManager.getToken(tokenType.ACCESS);

  if (!token) {
    redirect("/login");
  }

  const response = await AuthService.getInstance().getCurrentUser(token);

  if (!response.success || !response.data) {
    redirect("/login");
  }

  const user = response.data;

  // Transform BE data to FE interface if necessary
  // (In our case, the interface matches the returned data)

  return <ProfilePageClient user={user} />;
}
