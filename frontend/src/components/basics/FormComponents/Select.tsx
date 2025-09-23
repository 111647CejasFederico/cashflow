import React, { useId } from "react";

interface Option {
  value: string | number;
  label: string;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  id,
  className = "",
  placeholder,
  ...props
}) => {
  const autoId = useId();
  const selectId = id || autoId;
  const errId = `${selectId}-error`;
  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="block">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`border p-2 w-full ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <div id={errId} className="text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
export default Select;
