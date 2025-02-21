import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { login, register } from "../server/actions/auth";

export const useLoginAuth = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Login berhasil!",
        variant: "default",
      });
      router.push("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Login gagal",
        variant: "destructive",
      });
    },
  });
};

export const useRegisterAuth = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Register berhasil!",
        variant: "default",
      });
      router.push("/sign-in");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Register gagal",
        variant: "destructive",
      });
    },
  });
};
