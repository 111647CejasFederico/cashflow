import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className = "", type = "button", disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-busy={disabled || undefined}
      className={`inline-flex items-center px-3 py-2 border rounded focus:outline-none focus-visible:ring ${
        disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-50"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);
export default Button;
