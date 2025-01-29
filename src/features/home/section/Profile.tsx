/* eslint-disable */
import Image from "next/image";
import React from "react";
import profile from "../../../../public/assets/profile.svg";
import leaf3 from "../../../../public/assets/leaf3.svg";
import leaf4 from "../../../../public/assets/leaf4.svg";
import leaf5 from "../../../../public/assets/leaf5.svg";
import leaf6 from "../../../../public/assets/leaf6.svg";
import leaf7 from "../../../../public/assets/leaf7.svg";

export default function Profile() {
  return (
    <div className="w-full min-h-screen bg-primary-light_hover pt-36">
      <div className="">
        <div className="flex flex-row items-end justify-center h-screen text-start text-black px-24 relative">
          <Image
            src={leaf5}
            className="absolute -top-4 right-1/3 transform translate-x-1/4 -translate-y-1/2 w-[700px] z-10"
            alt="leaf"
          />
          <Image
            src={leaf4}
            className="absolute right-24 -top-6 w-[400px] z-10 transform -translate-y-1/2"
            alt="leaf"
          />
          <div className="w-1/2 space-y-4">
            <div className="space-y-2 mb-2 px-1">
              <h1 className="text-start text-black font-bold text-6xl">
                JOKO WIDODO
              </h1>
              <h2 className="font-normal text-black text-start text-3xl">
                Presiden Indonesia ketujuh
              </h2>
            </div>
            <p className="font-normal text-black leading-normal text-start text-[24px] px-2">
              “Yang berkaitan dengan kota masa depan seperti apa, banyak di
              antara kita masih banyak keliru, bahwa kota masa depan harus ada
              gedung pencakar langitnya. Menurut saya dan sekarang ini sudah
              mulai ada sebuah paradigma baru, kota yang baik adalah kota yang
              ramah pejalan kaki, kota yang baik kota yang ramah penyandang
              disabilitas, kota ramah pesepeda, kota ramah anak perempuan, kota
              yang ramah terhadap lingkungan,"
            </p>
            <p className="font-normal text-black leading-normal italic text-[24px] py-2 pb-8 pl-1">
              ucap Jokowi saat membuka Rakernas Apeksi di Balikpapan, Kalimantan
              Timur, Selasa (4/6/2024).
            </p>
          </div>
          <Image
            src={leaf3}
            className="absolute right-0 top-4 w-[350px] z-10"
            alt="leaf"
          />

          <Image
            src={leaf6}
            className="absolute -bottom-12 translate-x-1/2 -translate-y-1/4 w-[250px] z-10"
            alt="leaf"
          />
          <Image
            src={leaf7}
            className="absolute right-20 -bottom-24 -translate-y-1/2 w-[400px] z-10"
            alt="leaf"
          />
          <Image
            src={profile}
            className="w-1/2 z-20"
            alt="profile"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
