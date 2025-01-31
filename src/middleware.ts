import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const token = req.cookies.get("authToken");

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (req.url.includes("/logout")) {
    cookieStore.set("authToken", "", {
      expires: new Date(0),
      path: "/",
      secure: process.env.NODE_ENV === "production",  
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/peta", "/logout"],
};
