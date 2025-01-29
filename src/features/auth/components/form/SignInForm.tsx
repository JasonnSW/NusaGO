"use client";

import { CheckboxWithLabel } from "@/components/CheckBoxWithLabel";
import { InputWithLabel } from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../../../public/assets/LogoGreen.svg";
import { useRouter } from "next/navigation";
export default function SignInForm() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-2">
      <div className="flex items-center justify-center flex-col mb-4">
        <Image src={Logo} alt="Logo" className="w-auto h-auto" />
        <h1 className="text-2xl text-center md:text-4xl font-bold text-[#2A2A2A] mb-2">
          Welcome back!
        </h1>
        <p className="text-gray-600 text-center text-md mb-6">
          Please enter your details
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm md:max-w-lg space-y-4 px-2 md:px-8"
      >
        <InputWithLabel
          className="h-10"
          label="Email"
          placeholder="Richard@surya.com"
          type="email"
        />
        <InputWithLabel
          label="Password"
          placeholder="********"
          type="password"
        />
        <CheckboxWithLabel className="h-2" id="remember" label="Remember me" />
        <Button
          type="submit"
          className="w-full bg-primary-primary text-white py-2 rounded-md hover:bg-[#1E8449]"
        >
          Masuk Akun
        </Button>
      </form>
      <p className="mt-4">
        Tidak memiliki akun?{" "}
        <Link href="/sign-up" className="text-primary-primary">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
