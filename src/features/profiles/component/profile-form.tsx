/* eslint-disable */

"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DeleteProfilesButton from "./delete-profiles-button";
import { useForm } from "react-hook-form";
import { ProfileData, ProfileSchema } from "../schema/profiles";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateProfileForm } from "../hooks/use-profile-form";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/logout-button";

type ProfileFormProps = {
  initialData: any;
};

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();

  const form = useForm<ProfileData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      fullname: initialData?.fullname ?? "",
      institution: initialData?.institution ?? "",
      email: initialData?.email ?? "",
      bahasa: initialData?.bahasa ?? "Indonesia",
      negara: initialData?.negara ?? "Indonesia",
      description: initialData?.description ?? "",
    },
  });

  const { mutate: updateProfile, isPending } = useUpdateProfileForm();

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    updateProfile(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-8xl"
      >
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 p-4">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    className="h-12"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bahasa"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Bahasa</FormLabel>
                <FormControl>
                  <Input
                    className="h-12"
                    placeholder="Enter your language"
                    disabled={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Institusi</FormLabel>
                <FormControl>
                  <Input
                    className="h-12"
                    placeholder="Enter your institution"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="negara"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Negara</FormLabel>
                <FormControl>
                  <Input
                    className="h-12"
                    placeholder="Enter your country"
                    disabled={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="h-12"
                    placeholder="Enter your email"
                    disabled={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-16"
                    placeholder="Tulis Deskripsi Anda"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-x-6 pl-4">
            <Button
              className="bg-primary-primary text-white hover:bg-primary-dark px-4"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button
              className="text-black bg-white hover:bg-gray-50 border border-[#EFEFEF]"
              type="button"
              onClick={() => router.back()}
            >
              Batal
            </Button>
          </div>
          <div className="flex gap-x-6 pr-4">
            <LogoutButton
              type="button"
              className="text-black bg-white hover:bg-gray-50 border border-[#EFEFEF] font-sans font-normal text-base rounded-md px-4 hover:text-black"
            />
            <DeleteProfilesButton />
          </div>
        </div>
      </form>
    </Form>
  );
}
