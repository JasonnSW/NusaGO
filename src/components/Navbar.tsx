import Image from "next/image";
import React from "react";
import maleUser from "../../public/assets/male-user.svg";
import logo from "../../public/assets/Logo.svg";
import NavLink from "./NavLink";
import { Links } from "@/data/Link";
import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./logout-button";

export default function Navbar() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken");

  return (
    <nav className="flex justify-center gap-x-24 items-center h-auto bg-transparent text-white absolute top-4 left-4 right-4 shadow-sm font-geist-arial z-50 p-2">
      <div className="flex flex-row items-center">
        <Image src={logo} alt="logo" className="bg-transparent size-20" />
        <h1 className="text-4xl font-bold col flex items-center">NUSAGO</h1>
      </div>

      <NavLink links={Links} />

      <div className="flex items-center justify-between gap-x-5">
        <Link href="#" className="font-geist-arial font-bold text-xl">
          Contact Us
        </Link>
        <div className="font-bold text-xl">|</div>

        {authToken ? (
          <div className="gap-x-4 flex flex-row">
            <LogoutButton />
            <Image
              src={maleUser}
              alt="User Logo"
              className="w-12 h-12 rounded-full ml-4"
            />
          </div>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="font-geist-arial font-bold text-xl"
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
