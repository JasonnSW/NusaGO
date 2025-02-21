import { Label } from "@/components/ui/label";

type CheckboxWithLabelProps = {
  id: string;
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  termsText?: string;
  suffixText?: string;
  className?: string;
};

export function CheckboxWithLabel({
  id,
  label,
  termsText,
  suffixText,
  className,
}: CheckboxWithLabelProps) {
  return (
    <div className="flex items-center my-4">
      <input
        type="checkbox"
        id={id}
        className="w-6 h-5 borderborder-gray-300 rounded bg-white accent-[#606060] focus:outline-none mr-2 "
      />
      <Label htmlFor={id}>
        {label} <span className={className}>{termsText}</span> {suffixText}
      </Label>
    </div>
  );
}
