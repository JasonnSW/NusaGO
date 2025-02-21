"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../public/assets/Logo.svg";
import NavLink from "./NavLink";
import { Links } from "@/data/Link";
import Link from "next/link";
import LogoutButton from "./logout-button";
import { usePathname, useRouter } from "next/navigation";
import { validPathsList } from "@/data/paths";
import { AvatarDemo } from "./AvatarDemo";
import { getTokenFromCookies } from "@/features/auth/server/actions/get-cookies";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isProfile =
    pathname === "/profile" || !validPathsList.includes(pathname);

  const isActive = pathname === "/contact";

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      const tokenValue = await getTokenFromCookies();
      setToken(tokenValue);
    }
    fetchToken();
  }, []);

  return (
    <nav
      className={`flex justify-center gap-x-24 items-center h-auto ${
        isProfile ? "bg-primary-dark" : "bg-transparent"
      } text-white absolute top-0 left-0 right-0 shadow-sm font-geist-arial z-50 p-2`}
    >
      <div className="flex flex-row items-center">
        <Image src={logo} alt="logo" className="bg-transparent size-20" />
        <h1 className="text-4xl font-bold col flex items-center">NUSAGO</h1>
      </div>

      <NavLink links={Links} />

      <div className="flex items-center justify-between gap-x-5">
        <Link
          href="/contact"
          className={`font-geist-arial font-bold text-xl ${
            isActive
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-white hover:text-yellow-400"
          }`}
        >
          Contact Us
        </Link>
        <div className="font-bold text-xl">|</div>

        {token ? (
          <div className="gap-x-4 flex flex-row">
            <LogoutButton />
            <AvatarDemo
              onClick={() => {
                router.push("/profile");
              }}
              src="/assets/male-user.svg"
              alt="User Logo"
            />
          </div>
        ) : (
          <>
            <Link
              href="/sign-in"
              className={`font-geist-arial font-bold text-xl ${
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="mr-8 px-4 py-2 flex items-center bg-primary-primary rounded-full hover:bg-primary-light hover:text-primary-normal_hover text-xl font-bold"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
