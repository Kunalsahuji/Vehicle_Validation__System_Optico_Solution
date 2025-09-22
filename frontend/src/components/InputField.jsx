import React from "react";

export default function InputField({ label, error, success, className = "", ...props }) {
  return (
    <div className="relative w-full mb-5">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={props.id || props.name}
        className={`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200 focus:outline-none 
          ${error
            ? "border-red-500 focus:ring-2 focus:ring-red-400"
            : success
            ? "border-green-500 focus:ring-2 focus:ring-green-400"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {success && !error && <p className="mt-1 text-xs text-green-600">{success}</p>}
    </div>
  );
}
