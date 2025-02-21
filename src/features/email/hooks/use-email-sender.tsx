// import { useToast } from "@/hooks/use-toast";
// import { useMutation } from "@tanstack/react-query";
// import { sendEmail } from "../actions/email";

// export default function useEmailSender() {
//   const { toast } = useToast();

//   return useMutation({
//     mutationFn: sendEmail,
//     onSuccess: () => {
//       toast({
//         title: "Success",
//         description: "Notifikasi Berhasil",
//         variant: "default",
//       });
//     },
//     onError: (error) => {
//       toast({
//         title: "Error",
//         description: error.message || "Notifikasi Gagal",
//         variant: "destructive",
//       });
//     },
//   });
// }
