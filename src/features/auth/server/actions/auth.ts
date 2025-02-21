import { LoginData, RegisterData } from "@/features/auth/schemas/auth";

import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);

export const login = async (values: LoginData) => {
  console.log("Sending request to:", `${API_URL}/login`);
  console.log("Request body:", values);

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.log("Error response:", errorText);
      throw new Error(`Login failed: ${res.status}`);
    }

    const data = await res.json();
    return data.token;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const register = async (values: RegisterData) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    throw new Error("Register failed");
  }
  return res.json();
};

export const logout = async () => {
  redirect("/login");
};
