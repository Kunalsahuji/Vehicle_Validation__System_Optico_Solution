import React, { useState, useEffect } from "react";
import vehicleService from "../services/vehicleService";
import { Link } from "react-router-dom";
import { normalizeNumber } from "../utils/format";

export default function Home() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const [all, setAll] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        // fetch all vehicles for listing (if allowed)
        (async () => {
            try {
                const v = await vehicleService.getAll();
                setAll(v);
            } catch {
                // ignore if not allowed

            }
        })();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;
        setErr("");
        try {
            const res = await vehicleService.search(query);
            setResult(res);
            console.log("search result", res);
        } catch (error) {
            console.log(error);
            setErr(error.response?.data?.message || "Not found");
            setResult([]);
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-3 ">
            <div className="md:col-span-2">
                <div className="bg-white p-4 rounded shadow">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            className="flex-1 border rounded px-3 py-2"
                            placeholder="Search by vehicle number or pass number (e.g. MH12LP3162 or 3162 or T25FC600)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button className="px-4 bg-accent text-white rounded">Search</button>
                    </form>

                    {err && <div className="text-red-600 mt-3">{err}</div>}

                    {result.length > 0 && (
                        <div className="mt-4 space-y-3">
                            {result.map((v) => (
                                <div key={v._id} className="p-3 border rounded bg-gray-50">
                                    <h3 className="text-lg font-semibold">
                                        {v.vehicleNumber} — {v.passNumber}
                                    </h3>
                                    <p className="text-sm text-gray-600">Owner: {v.ownerName}</p>
                                    <p className="text-sm text-gray-600">Flat: {v.flatNumber}</p>
                                    <Link
                                        to={`/vehicle/${v._id}`}
                                        className="text-blue-600 mt-2 inline-block"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* Recent Vehicles */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border">
                    <h4 className="text-lg font-semibold mb-4">🚗 Recent Vehicles</h4>

                    {all.length === 0 ? (
                        <div className="text-gray-500 italic">No vehicles found.</div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {all.slice(0, 10).map((v) => (
                                <div
                                    key={v._id}
                                    className="group bg-gradient-to-r from-gray-50 to-white p-5 rounded-lg shadow hover:shadow-lg transition border flex flex-col justify-between"
                                >
                                    {/* Vehicle Header */}
                                    <div>
                                        <div className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <span className="bg-accent text-white px-2 py-1 rounded text-sm">
                                                {v.passNumber}
                                            </span>
                                            {v.vehicleNumber}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {v.ownerName} • Flat {v.flatNumber}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <Link
                                        to={`/vehicle/${v._id}`}
                                        className="mt-3 inline-flex items-center text-sm text-accent hover:underline font-medium"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            <aside className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold mb-2">Quick Actions</h4>
                <div className="flex flex-col gap-2">
                    <Link to="/add-vehicle" className="px-3 py-2 bg-primary text-white rounded text-center">Add Vehicle</Link>
                    <Link to="/admin-panel" className="px-3 py-2 border rounded text-center">Admin Panel</Link>
                </div>
            </aside>
        </div>
    );
}
