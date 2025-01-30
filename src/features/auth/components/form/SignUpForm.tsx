/* eslint-disable */
"use client";
import { CheckboxWithLabel } from "@/components/CheckBoxWithLabel";
import { InputWithLabel } from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../../public/assets/LogoGreen.svg";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    institution: "",
    email: "",
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {  
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error:", errorText);
        throw new Error(errorText);
      }
      router.push("/sign-in");
    } catch (error: any) {
      console.error("Error:", error);
      setError(error.message);
      alert("Terjadi kesalahan, coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4 font-geist-arial">
      <div className="flex items-center justify-center gap-x-2">
        <Image src={Logo} alt="Logo" className="w-16 h-24" />
        <h1 className="font-geist-arial font-bold text-2xl text-primary-primary">
          NUSAGO
        </h1>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 text-[#474747]">
        Create your account
      </h2>
      <div className="container flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full px-4 max-w-md space-y-4"
        >
          <InputWithLabel
            label="Nama Lengkap"
            placeholder="Richard"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
          <InputWithLabel
            label="Nama Instansi"
            placeholder="Berikan nama instansi anda"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
          />
          <InputWithLabel
            label="Email"
            placeholder="Richard@workmail.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputWithLabel
            label="Username"
            placeholder="Buat Username anda"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <InputWithLabel
            label="Password"
            placeholder="Buat Password anda"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex items-center my-2">
            <CheckboxWithLabel
              id="terms"
              label="Saya setuju dengan"
              termsText="Syarat dan Ketentuan"
              suffixText="yang berlaku"
              className="text-primary-primary"
            />
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <Button
            type="submit"
            className="w-full bg-primary-primary text-white py-2 rounded-md hover:bg-[#E3E8EC] hover:text-primary-primary"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Buat Akun"}
          </Button>
        </form>
        <p className="mt-2 flex justify-center">
          Sudah memiliki akun?&nbsp;
          <Link href="/sign-in" className="text-primary-primary">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
