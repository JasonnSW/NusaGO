import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export function AvatarDemo({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
}) {
  return (
    <Avatar onClick={onClick}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="text-black">JS</AvatarFallback>
    </Avatar>
  );
}
