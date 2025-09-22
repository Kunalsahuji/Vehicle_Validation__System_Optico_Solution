import React, { useState, useEffect } from "react";
import vehicleService from "../services/vehicleService";
import { Link } from "react-router-dom";
import { normalizeNumber } from "../utils/format";

export default function Home() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
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
        } catch (error) {
            setErr(error.response?.data?.message || "Not found");
            setResult(null);
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-3">
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

                    {result && (
                        <div className="mt-4 p-3 border rounded">
                            <h3 className="text-lg font-semibold">{result.vehicleNumber} — {result.passNumber}</h3>
                            <p className="text-sm text-gray-600">Owner: {result.ownerName}</p>
                            <p className="text-sm text-gray-600">Flat: {result.flatNumber}</p>
                            <Link to={`/vehicle/${result._id}`} className="text-accent mt-2 inline-block">View Details</Link>
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Recent Vehicles</h4>
                    <div className="grid gap-3">
                        {all.slice(0, 10).map(v => (
                            <div key={v._id} className="bg-white p-3 rounded shadow-sm flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{v.vehicleNumber}</div>
                                    <div className="text-sm text-gray-500">{v.ownerName} • {v.flatNumber}</div>
                                </div>
                                <Link to={`/vehicle/${v._id}`} className="text-sm text-accent">Details</Link>
                            </div>
                        ))}
                    </div>
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
