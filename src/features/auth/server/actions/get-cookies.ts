"use server";

import { cookies } from "next/headers";

export async function getTokenFromCookies() {
  return await cookies().get("token")?.value || null;
}
