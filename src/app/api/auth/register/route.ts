import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error from API:", errorText);
    return new Response("Registration failed", { status: 400 });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
