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

        /* MH12LP3162
        // Flat_Number: "F25C",
        // Vehicle_Owner_Name: "Ajay"
        // V_Owner_Contact: "678888997766",
        // Flat_Owner_Name: "Vijay Singh"
        // Flat_Owner_Contact: "78888887766"
        // Pass_Validity: "25/07/26"
        // Pass_Number: "T-25FC600"*/
        // show above details in this page nicely
        <div className="bg-white p-6 rounded shadow max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">Vehicle Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><strong>Vehicle Number:</strong> {v.vehicleNumber}</div>
                <div><strong>Pass Number:</strong> {v.passNumber}</div>
                <div><strong>Flat Number:</strong> {v.flatNumber}</div>
                <div><strong>Owner Name:</strong> {v.ownerName}</div>
                <div><strong>Owner Contact:</strong> {v.ownerContact}</div>
                <div><strong>Flat Owner Name:</strong> {v.flatOwnerName}</div>
                <div><strong>Flat Owner Contact:</strong> {v.flatOwnerContact}</div>
                {/* dl or rc number and vehicle type */}
                <div><strong>DL/RC Number:</strong> {v.dlOrRcNumber}</div>
                <div><strong>Vehicle Type:</strong> {v.vehicleType}</div>
                <div><strong>Valid Till:</strong> {new Date(v.validTill).toLocaleDateString()}</div>
            </div>
            {/* <h2 className="text-2xl font-semibold mb-3">{v.vehicleNumber} <span className="text-sm text-gray-500">({v.passNumber})</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><strong>Owner</strong><div>{v.ownerName}</div></div>
                <div><strong>Contact</strong><div>{v.ownerContact}</div></div>
                <div><strong>Flat</strong><div>{v.flatNumber}</div></div>
                <div><strong>Valid Till</strong><div>{new Date(v.validTill).toLocaleDateString()}</div></div>
                <div className="md:col-span-2">
                    <strong>Address</strong>
                    <div>{v.permanentAddress}</div>
                </div>
            </div> */}
        </div>
    );
}
