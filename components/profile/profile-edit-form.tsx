"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { User, Mail, Camera, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProfile } from "@/action/profile/update-profile";
import { toast } from "sonner";
import { User as UserInterface } from "@/lib/interface/user.interface";

interface ProfileEditFormProps {
  user: UserInterface;
  onCancel: () => void;
  onSuccess: () => void;
}

export function ProfileEditForm({ user, onCancel, onSuccess }: ProfileEditFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.avatarUrl ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${user.avatarUrl}` : null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm({
    defaultValues: {
      fullName: user.fullName || "",
      email: user.email || "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("fullName", values.value.fullName);
      formData.append("email", values.value.email);
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const res = await updateProfile(formData);
      if (res.success) {
        toast.success("Profile updated successfully!");
        onSuccess();
      } else {
        toast.error(res.message || "Update failed.");
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-none shadow-xl bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <User className="w-6 h-6 text-primary" />
          Edit Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-lg group-hover:border-primary/40 transition-all duration-300">
                <AvatarImage src={previewUrl || ""} alt={user.fullName} className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                  {user.fullName?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-1 right-1 p-2 bg-primary text-white rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform active:scale-95"
              >
                <Camera className="w-5 h-5" />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <p className="text-sm text-muted-foreground">Click the camera icon to change avatar</p>
          </div>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form.Field name="fullName">
              {(field) => (
                <Field className="space-y-2">
                  <FieldLabel htmlFor={field.name} className="text-sm font-semibold">
                    Full Name
                  </FieldLabel>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                      placeholder="Enter your full name"
                      className="pl-10 bg-muted/20 border-muted-foreground/20 focus-visible:border-primary focus-visible:ring-primary/10 transition-all"
                    />
                  </div>
                  {field.state.meta.errors && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <Field className="space-y-2">
                  <FieldLabel htmlFor={field.name} className="text-sm font-semibold">
                    Email Address
                  </FieldLabel>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 bg-muted/20 border-muted-foreground/20 focus-visible:border-primary focus-visible:ring-primary/10 transition-all"
                    />
                  </div>
                  {field.state.meta.errors && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-muted-foreground/10">
            <Button 
                variant="outline" 
                type="button" 
                onClick={onCancel}
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
