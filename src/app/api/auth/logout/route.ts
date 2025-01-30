import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();

  cookieStore.set("authToken", "", {
    expires: new Date(0),
    path: "/",
  });
  revalidatePath("/");

  return new Response("Logged out successfully", { status: 200 });
}
