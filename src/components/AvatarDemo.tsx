import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import maleUser from "../../public/assets/male-user.svg";
export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src={maleUser} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
