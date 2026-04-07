"use client";

import React, { useState } from "react";
import { User, Mail, Calendar, Shield, Edit3, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileEditForm } from "@/components/profile/profile-edit-form";
import { User as UserInterface } from "@/lib/interface/user.interface";
import Link from "next/link";

interface ProfilePageClientProps {
  user: UserInterface;
}

export function ProfilePageClient({ user }: ProfilePageClientProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ProfileEditForm 
            user={user} 
            onCancel={() => setIsEditing(false)} 
            onSuccess={() => {
                setIsEditing(false);
                // Refresh is handled by revalidatePath in server action
            }} 
        />
      </div>
    );
  }

  const avatarUrl = user.avatarUrl 
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${user.avatarUrl}` 
    : null;

  return (
    <div className="container mx-auto max-w-5xl py-12 px-6 space-y-8 animate-in fade-in duration-700">
      <div className="mt-12 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer w-fit">
        <ArrowLeft className="w-4 h-4" />
        <Link href="/" className="text-sm font-medium">Back to Home</Link>
      </div>

      <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-card to-muted/30">
        <div className="h-48 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative">
          <div className="absolute -bottom-16 left-8 md:left-12">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-8 border-background shadow-2xl">
              <AvatarImage src={avatarUrl || ""} alt={user.fullName} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-primary text-4xl font-bold italic">
                {user.fullName?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <CardContent className="pt-20 pb-12 px-8 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                  {user.fullName || user.username}
                </h1>
                <p className="text-muted-foreground flex items-center gap-2 font-medium">
                  @{user.username}
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold tracking-wider text-[10px] px-2 py-0">
                    {user.role?.name || "USER"}
                  </Badge>
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground p-3 rounded-xl bg-muted/50 border border-muted-foreground/5">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="font-medium">{user.email}</span>
                </div>
                {user.createdAt && (
                  <div className="flex items-center gap-3 text-muted-foreground p-3 rounded-xl bg-muted/50 border border-muted-foreground/5">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </div>

            <Button 
              onClick={() => setIsEditing(true)}
              className="md:self-start bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 h-12 px-8 rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 border-none shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-muted-foreground/5">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              <Badge className={user.status ? "bg-green-500/10 text-green-600 border-none font-bold" : "bg-yellow-500/10 text-yellow-600 border-none font-bold"}>
                {user.status ? "Active" : "Pending"}
              </Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-muted-foreground">ID</span>
              <span className="text-xs font-mono text-muted-foreground/60">{user._id}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-none shadow-xl bg-card/50 backdrop-blur-sm">
           <CardHeader>
             <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
           </CardHeader>
           <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
             <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 opacity-20" />
             </div>
             <p className="text-sm font-medium">Your recent orders and activities will appear here.</p>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
