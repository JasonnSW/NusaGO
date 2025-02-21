"use server"

import { cookies } from "next/headers";
import { emailData } from "../schema/email";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendEmail(data: emailData) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  console.log("Authorization:", `Bearer ${token}`);

  if (!token) {
    return null;
  }

  const response = await fetch(`${API_URL}/send-email`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Gagal menyimpan profil");
  }
  return response.json();
}
