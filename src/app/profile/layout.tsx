import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/features/profiles/utils/query";
import React from "react";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <div className="w-full h-screen">{children}</div>;
      <Toaster />
    </QueryProvider>
  );
}
