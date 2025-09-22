import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-100 via-white to-gray-200 px-6">
            {/* Big 404 */}
            <h1 className="text-9xl font-extrabold text-gray-300 select-none">404</h1>

            {/* Message */}
            <p className="mt-4 text-2xl md:text-3xl font-semibold text-gray-700">
                Oops! Page not found
            </p>
            <p className="mt-2 text-gray-500 text-center max-w-md">
                The page you’re looking for doesn’t exist or may have been moved.
            </p>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
                <Link
                    to="/"
                    className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
                >
                    ⬅ Go Home
                </Link>
                <Link
                    to="/add-vehicle"
                    className="px-5 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-300 transition"
                >
                    🚗 Add Vehicle
                </Link>
            </div>
        </div>
    );
}
