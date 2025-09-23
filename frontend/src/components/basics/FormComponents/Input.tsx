import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, id, className = "", ...props }) => {
  const autoId = useId();
  const inputId = id || autoId;
  const errId = `${inputId}-error`;
  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`border p-2 w-full ${error ? "border-red-500" : ""} ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        {...props}
      />
      {error && (
        <span id={errId} className="text-red-500 text-sm">
          {error}
        </span>
      )}
    </div>
  );
};
export default Input;
