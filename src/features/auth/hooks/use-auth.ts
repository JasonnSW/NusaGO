import { useState } from "react";
import { loginRequest } from "@/features/auth/api/login-request";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const login = async (formData: { email: string; password: string }) => {
    try {
      const { token, error } = await loginRequest(formData);
      console.log(token);

      if (error) {
        setErrorMessage(error);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Terjadi kesalahan, coba lagi.");
    }
  };

  return { login, errorMessage };
};
