import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  const userData = await req.json();
  console.log("Received userData:", userData);
  const response = await fetch(
    "https://nusago-ruddy.vercel.app/api/v1/users/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error from API:", errorText);
    return new Response("Registration failed", { status: 400 });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
