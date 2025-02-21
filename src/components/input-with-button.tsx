import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InputWithButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex w-full items-center justify-center space-x-2 p-4">
      <Input
        className="min-w-full md:w-[500px] p-6 border-primary-primary placeholder:text-base md:placeholder:text-xl text-xl"
        type="email"
        placeholder="Silahkan masukkan email anda"
      />
      <Button
        onClick={onClick}
        className="p-6 text-white bg-primary-primary hover:bg-primary-primary focus:border-none font-geist-arial"
        type="submit"
      >
        Notifikasi Saya
      </Button>
    </div>
  );
}
