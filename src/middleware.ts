import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  const res = NextResponse.next();
  if (req.url.includes("/logout")) {
    res.cookies.set("token", "", {
      expires: new Date(0),
      path: "/",
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/peta", "/profile"],
};
