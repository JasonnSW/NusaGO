"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import ForgotPassword from "../../../../public/assets/ForgotPassword.svg";
import { useDeleteProfile } from "../hooks/use-profile-form";

type DeleteProfilesPopUpProps = {
  open: boolean;
  onClose: () => void;
};

export default function DeleteProfilesPopUp({
  open,
  onClose,
}: DeleteProfilesPopUpProps) {
  const { mutate: deleteProfile, isPending } = useDeleteProfile();

  const handleDeleteProfile = () => {
    if (!isPending) {
      deleteProfile();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-transform w-3/5 md:w-2/5 h-auto flex flex-col items-center justify-center ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image src={ForgotPassword} alt="forgot-password" />
          <h1 className="text-[#3B3B3B] text-center font-normal text-base md:text-xl">
            Apakah Anda yakin ingin menghapus akun ini?
          </h1>
          <p className="max-w-md md:max-w-xl text-lg md:text-sm text-neutral-dark text-center font-geist-arial mb-6">
            **Akun yang dihapus tidak dapat dikembalikan, walaupun memiliki
            paket langganan.
          </p>
          <div className="flex justify-between items-center w-full gap-4">
            <Button
              className="border rounded-lg text-base px-5 md:px-10 md:py-3 md:text-lg bg-primary-primary hover:bg-primary-dark"
              onClick={onClose}
              type="button"
            >
              Kembali
            </Button>
            <Button
              className="border rounded-lg text-base px-5 md:px-10 md:py-3 md:text-lg bg-[#AF0000] hover:bg-red-900"
              onClick={handleDeleteProfile}
              type="button"
              disabled={isPending}
            >
              {isPending ? "Menghapus..." : "Hapus Akun"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
