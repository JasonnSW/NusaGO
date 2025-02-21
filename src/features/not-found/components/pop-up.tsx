import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { MouseEventHandler } from "react";
import leaf1 from "../../../../public/assets/leaf1.svg";
import leaf4 from "../../../../public/assets/leaf4.svg";

export default function PopUp({
  open,
  onClose,
}: {
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
}) {

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all w-3/5 md:w-2/5 h-1/2 flex flex-col items-center justify-center ${
          open ? "scale-100 opacity-100 " : "scale-125 opacity-0"
        }`}
      >
        <Image
          className="absolute -top-4 -left-16"
          width={300}
          height={200}
          src={leaf4}
          alt="leaf4"
        />
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-primary-dark text-center font-bold text-2xl md:text-5xl">
            Notifikasi Berhasil!
          </h1>
          <p className=" max-w-md md:max-w-sm text-sm md:text-lg text-neutral-dark text-center font-geist-arial mb-12">
            Segera kami informasikan ke email anda jika fitur ini telah
            dirilis!, Terimakasih
          </p>

          <Button
            className="border rounded-lg text-base px-5 md:px-10 md:py-5 md:text-lg bg-primary-primary hover:bg-primary-primary"
            onClick={onClose}
          >
            Kembali
          </Button>
        </div>
        <Image
          className="absolute -bottom-20 -right-20"
          width={300}
          height={200}
          src={leaf1}
          alt="leaf1"
        />
      </div>
    </>
  );
}
