import type { ButtonHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = ({
  label,
  variant = "primary",
  size = "md",
  fullWidth = true,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const { t } = useTranslation();
  const baseStyles = "flex cursor-pointer items-center justify-center rounded-[2px] text-sm uppercase tracking-[0.08em] transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-50";

  const variantStyles = {
    primary: "bg-rust text-paper hover:opacity-85",
    ghost: "border border-charcoal bg-transparent text-warm hover:border-flame hover:text-paper",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5",
    md: "px-4 py-[15px]",
    lg: "px-6 py-[15px]",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const buttonClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`;

  return (
    <button
      className={buttonClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {t("calculator.form.loading")}
        </>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
