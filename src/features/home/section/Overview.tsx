"use client"
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { VscArrowRight } from "react-icons/vsc";  
import ProductCard from "@/features/home/components/ProductCard";
import { useRouter } from "next/navigation";

export default function Overview() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-neutral-light">
      <div className="p-24">
        <div className="flex flex-col md:flex-row gap-x-12">
          <div className="w-1/2">
            <Image width={840} height={743} src="/assets/content.svg" alt="content" />
          </div>
          <div className="w-1/2">
            <div className="flex flex-col gap-y-6 items-start justify-start px-2">
              <h1 className="font-bold text-[40px] text-primary-normal_active leading-[150%]">
                Permudah Perencanaan Kota Hijau dengan Peta Hijau
              </h1>
              <p className="text-black text-[32px] text-justify leading-relaxed">
                Ciptakan lingkungan perkotaan yang lebih sehat dan berkelanjutan
                dengan integrasi data{" "}
                <span className="text-primary-primary italic">
                  emission, vegetation, dan land cover
                </span>
              </p>
              <Button
                onClick={() => router.push("/peta")}
                rightIcon={<VscArrowRight />}
                iconSize="text-3xl"
                className="rounded-[45px] p-6 text-primary-dark bg-white border-[3px] border-primary-dark hover:text-white hover:bg-primary-dark text-2xl"
              >
                Peta Hijau
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-[110%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-20">
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
