"use client";

import Image from "next/image";
import React from "react";
import logo from "../../public/assets/Logo.svg";
import NavLink from "./NavLink";
import { Links } from "@/data/Link";
import { usePathname } from "next/navigation";
import { validPathsList } from "@/data/paths";

export default function NavbarProfile() {
  const pathname = usePathname();
  const isProfile =
    pathname === "/profile" || !validPathsList.includes(pathname);

  return (
    <nav
      className={`flex justify-between px-16 items-center h-auto ${
        isProfile ? "bg-primary-dark" : "bg-transparant"
      } text-white absolute top-0 left-0 right-0 shadow-sm font-geist-arial z-50 p-2`}
    >
      <div className="flex flex-row items-center gap-x-12">
        <div className="flex flex-row items-center">
          <Image src={logo} alt="logo" className="bg-transparent size-20" />
          <h1 className="text-4xl font-bold col flex items-center">NUSAGO</h1>
        </div>
        <NavLink links={Links} />
      </div>

      <div className="text-3xl font-bold">Detail Akun</div>
    </nav>
  );
}
