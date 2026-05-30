import { useId, type InputHTMLAttributes, type ReactNode } from "react";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "type"> {
  label?: string;
  error?: string;
  type?: "text" | "number";
  variant?: "white" | "gray";
  prefix?: ReactNode;
}

const TextInput = ({
  label,
  error,
  variant = "white",
  prefix,
  type = "text",
  className = "",
  id,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextInputProps) => {
  const generatedId = useId();
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-") || generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined;

  const variantStyles = {
    white: "border border-charcoal bg-night text-paper placeholder:text-wood",
    gray: "border border-charcoal bg-night text-paper placeholder:text-wood",
  };

  return (
    <div className="flex w-full flex-col gap-[0.6rem]">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-normal uppercase leading-none tracking-[0.14em] text-warm"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-serif text-base italic text-sand">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full rounded-[2px] px-3 py-3.5 text-[17px] font-normal leading-none outline-none transition-colors focus:border-flame ${variantStyles[variant]} ${prefix ? "pl-8" : ""} ${error ? "border-flame" : ""} ${className}`}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          {...props}
        />
      </div>
      {error && (
        <span id={errorId} className="text-sm text-flame">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextInput;
