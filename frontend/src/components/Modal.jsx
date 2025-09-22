import React from "react";

export default function Modal({ isOpen, onClose, children, title }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-600">
                        Close
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}
