"use client";

import { CheckboxWithLabel } from "@/components/CheckBoxWithLabel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../../../public/assets/LogoGreen.svg";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginData, LoginSchema } from "../../schemas/auth";
import { useLoginAuth } from "../../hooks/use-auth";

export default function SignInForm() {
  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    login(values);
  };
  const { mutate: login, isPending } = useLoginAuth();

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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4"
        >
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <CheckboxWithLabel id="remember" label="Remember me" />

          <Button
            type="submit"
            className="w-full bg-primary-primary hover:bg-primary-dark text-white py-2 rounded-md"
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Masuk Akun"}
          </Button>
        </form>
        <p className="mt-4">
          Tidak memiliki akun?{" "}
          <Link href="/sign-up" className="text-primary-primary">
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  );
}
