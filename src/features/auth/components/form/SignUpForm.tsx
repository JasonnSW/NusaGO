/* eslint-disable */
"use client";
import { CheckboxWithLabel } from "@/components/CheckBoxWithLabel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../../public/assets/LogoGreen.svg";
import React from "react";
import { z } from "zod";
import { RegisterData, RegisterSchema } from "../../schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterAuth } from "../../hooks/use-auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function SignUpForm() {
  const form = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullname: "",
      institution: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const { mutate: register, isPending } = useRegisterAuth();
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    register(values);
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto space-y-4 font-geist-arial">
      <div className="flex items-center justify-center gap-x-2">
        <Image src={Logo} alt="Logo" className="w-16 h-20" />
        <h1 className="font-geist-arial font-bold text-2xl text-primary-primary">
          NUSAGO
        </h1>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#474747]">
        Create your account
      </h2>
      <div className="container flex flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full px-4 max-w-md space-y-4"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Richard"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Instansi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Berikan nama instansi anda"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Richard@workmail.com"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Buat Username anda"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Buat Password anda"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-sm" />
                </FormItem>
              )}
            />

            <CheckboxWithLabel
              id="terms"
              label="Saya setuju dengan"
              termsText="Syarat dan Ketentuan"
              suffixText="yang berlaku"
              className="text-primary-primary"
            />
            <Button
              type="submit"
              className="w-full bg-primary-primary text-white py-2 rounded-md hover:bg-[#E3E8EC] hover:text-primary-primary"
              disabled={isPending}
            >
              {isPending ? "Memproses..." : "Buat Akun"}
            </Button>
          </form>
        </Form>
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
