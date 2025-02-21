import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type LinkProps = {
  id: number;
  href: string;
  title: string;
};

type NavLinkProps = {
  links: LinkProps[];
};

export default function NavLink({ links }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between w-auto mx-4 font-geist-arial">
      <div className="flex flex-row items-center justify-center space-x-12">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              href={link.href}
              key={link.id}
              className={`font-geist-arial text-xl transition-colors ${
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
