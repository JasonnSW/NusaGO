"use server";

import { cookies } from "next/headers";
import { ProfileData } from "../../schema/profiles";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);
export async function getProfile() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  console.log("Authorization:", `Bearer ${token}`);

  if (!token) {
    return null; 
  }

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  console.log("Response status:", response.status, response.statusText);

  if (!response.ok) {
    console.error(
      "Gagal mengambil profil:",
      response.status,
      response.statusText
    );
    throw new Error("Gagal mengambil data profil");
  }

  const res = await response.json();
  console.log("Response data:", res);
  return {
    email: res.data.email,
    fullname: res.data.fullname,
    institution: res.data.institution,
    bahasa: "Indonesia",
    negara: "Indonesia",
    description: res.data.description || "",
  };
}

export async function updateProfile(data: ProfileData) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(`${API_URL}/update-account`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("Response status:", response.status, response.statusText);
  if (!response.ok) {
    throw new Error("Gagal menyimpan profil");
  }
  return response.json();
}

export async function deleteProfile() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(`${API_URL}/delete-account`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Gagal menghapus account");
  }
  cookieStore.delete("token");
  return response.json();
}
