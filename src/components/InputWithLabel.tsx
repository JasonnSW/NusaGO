import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputWithLabelProps = {
  label: string;
  placeholder: string;
  type?: string;
  id?: string;
  className?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputWithLabel({
  label,
  placeholder,
  type,
  name,
  className,
  value,
  onChange,
  ...props
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-md items-center gap-y-2">
      <Label htmlFor={label}>{label}</Label>
      <Input
        name={name}
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
