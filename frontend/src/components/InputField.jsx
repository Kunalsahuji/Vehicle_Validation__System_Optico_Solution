import React from "react";

export default function InputField({ label, ...props }) {
    return (
        <div className="mb-3">
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}
            <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                {...props}
            />
        </div>
    );
}
