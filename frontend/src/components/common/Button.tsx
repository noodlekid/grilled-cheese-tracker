import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "danger";
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "default",
  loading,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "btn",
        variant === "primary" && "btn-primary",
        variant === "danger" && "btn-danger",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "⏳ Loading..." : children}
    </button>
  );
}
