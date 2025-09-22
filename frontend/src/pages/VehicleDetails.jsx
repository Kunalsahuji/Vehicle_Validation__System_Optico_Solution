import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import vehicleService from "../services/vehicleService";

export default function VehicleDetails() {
    const { id } = useParams();
    const [v, setV] = useState(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await vehicleService.getById(id);
                setV(res);
            } catch (error) {
                setErr("Failed to load");
            }
        })();
    }, [id]);

    if (err) return <div>{err}</div>;
    if (!v) return <div>Loading...</div>;

    return (
        <div className="bg-white p-6 rounded shadow max-w-2xl">
            <h2 className="text-2xl font-semibold mb-3">{v.vehicleNumber} <span className="text-sm text-gray-500">({v.passNumber})</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><strong>Owner</strong><div>{v.ownerName}</div></div>
                <div><strong>Contact</strong><div>{v.ownerContact}</div></div>
                <div><strong>Flat</strong><div>{v.flatNumber}</div></div>
                <div><strong>Valid Till</strong><div>{new Date(v.validTill).toLocaleDateString()}</div></div>
                <div className="md:col-span-2">
                    <strong>Address</strong>
                    <div>{v.permanentAddress}</div>
                </div>
            </div>
        </div>
    );
}
