/* eslint-disable */

import React from "react";
import NotFoundImage from "../../public/assets/not-found.svg";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import EmailSender from "@/features/not-found/components/email-sender";
import leaf1 from "../../public/assets/leaf1.svg";
import leaf4 from "../../public/assets/leaf4.svg";
import leaf7 from "../../public/assets/leaf7.svg";

export default function notFound() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Image className="fixed bottom-36 -right-48 transform translate-y-1/2" width={600} src={leaf1} alt="leaf1"/>
      <Image className="absolute -top-24 -left-24 transform translate-y-1/2" width={400} src={leaf4} alt="leaf1"/>
      <Image className="absolute -bottom-48 -left-32 transform -translate-y-1/2" width={400} src={leaf7} alt="leaf1"/>
      <Navbar />
      <main className="flex flex-col items-center justify-center relative pt-24 gap-y-3">
        <div className="flex flex-col items-center justify-center">
          <Image src={NotFoundImage} width={400} height={400} alt="not-found" />
          <h1 className="text-primary-dark text-6xl md:text-8xl font-bold h-auto">
            Coming Soon
          </h1>
        </div>
        <h2 className="font-semibold text-2xl md:text-4xl text-center font-geist-arial text-[#3b3b3b] max-w-3xl pt-4">
          Solusi terbaik dalam pembangunan kota hijau sedang dikembangkan!
        </h2>
        <EmailSender />
        <p className="text-gray-500 font-geist-arial">
          'Notifikasi saya jika fitur telah dirilis'
        </p>
      </main>
    </div>
  );
}
