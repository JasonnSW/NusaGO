"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "GET",
    });
    router.refresh();
  };

  return <button onClick={handleLogout} className="font-geist-arial font-bold text-xl">Logout</button>;
}
