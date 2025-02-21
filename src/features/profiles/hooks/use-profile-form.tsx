"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteProfile, updateProfile } from "../server/action/profiles";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function useUpdateProfileForm() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Update Profile Berhasil",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Update Profile Gagal",
        variant: "destructive",
      });
    },
  });
}
export function useDeleteProfile() {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Delete Akun Berhasil",
        variant: "default",
      });
      router.push("/sign-up");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Delete Akun Gagal",
        variant: "destructive",
      });
    },
  });
}
