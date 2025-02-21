import { z } from "zod";

export const handleRequest = async <T>(
  url: string,
  method: string,
  data: unknown,
  schema: z.ZodType<T>
): Promise<T> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const validatedData = schema.parse(data);

  const response = await fetch(`${API_URL}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  const res = await response.json();
  return res;
};
