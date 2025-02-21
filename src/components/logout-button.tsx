"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function LogoutButton({
  className,
}: {
  className?: string;
  type?: "button" | "submit";
}) {
  const router = useRouter();

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    await fetch("/api/auth/logout", {
      method: "GET",
    });
    router.push("/sign-in");
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(
        "font-geist-arial font-bold text-xl hover:text-yellow-400",
        className
      )}
    >
      Logout
    </button>
  );
}
