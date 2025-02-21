import { LoginData, RegisterData } from "@/features/auth/schemas/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (values: LoginData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    throw new Error("Login failed");
  }
  return res.json();
};

export const register = async (values: RegisterData) => {
  const res = await fetch(`${API_URL}/register`, {
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
