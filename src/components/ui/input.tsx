import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, name, value, onChange, rightIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {leftIcon && <div className="absolute left-6">{leftIcon}</div>}
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            leftIcon && "pl-10", 
            rightIcon && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && <div className="absolute right-12">{rightIcon}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
