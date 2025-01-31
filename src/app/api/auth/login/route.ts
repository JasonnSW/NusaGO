import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(
    `${apiUrl}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error from API:", errorText);
    return new Response("Login failed", { status: 400 });
  }

  const data = await response.json();

  const token = data.data?.token;

  const cookieStore = cookies();

  const responseWithCookie = NextResponse.json({
    message: "Login successful",
    token: token,
  }); 

  cookieStore.set("authToken", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return responseWithCookie;
}
