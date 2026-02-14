import React from "react";
import { cn } from "@/shared/lib/utils/cn";

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ className, options, value, onChange, name, ...props }, ref) => {
    return (
      <fieldset ref={ref} className={cn("space-y-2", className)} {...props}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="h-4 w-4 text-[var(--brand-accent)] focus:ring-[var(--state-focus)] border-gray-300"
            />
            <span className="text-sm text-[var(--text-primary)]">{option.label}</span>
          </label>
        ))}
      </fieldset>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
