import React, { useState } from "react";
import InputField from "../components/InputField";
import vehicleService from "../services/vehicleService";
import { useNavigate } from "react-router-dom";

export default function AddVehicle() {
    const [form, setForm] = useState({
        vehicleNumber: "", passNumber: "", flatNumber: "", ownerName: "", dlOrRcNumber: "", ownerContact: "",
        alternateContact: "", email: "", permanentAddress: "", flatOwnerName: "", validTill: ""
    });
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await vehicleService.create(form);
            navigate("/home");
        } catch (error) {
            setErr(error.response?.data?.message || "Failed");
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Add Vehicle</h3>
            {err && <div className="text-red-600 mb-3">{err}</div>}
            <form onSubmit={handleSubmit}>
                <InputField label="Vehicle Number" name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} required />
                <InputField label="Pass Number" name="passNumber" value={form.passNumber} onChange={handleChange} required />
                <InputField label="Flat Number" name="flatNumber" value={form.flatNumber} onChange={handleChange} required />
                <InputField label="Owner Name" name="ownerName" value={form.ownerName} onChange={handleChange} required />
                <InputField label="Owner Contact" name="ownerContact" value={form.ownerContact} onChange={handleChange} required />
                <InputField label="Valid Till" name="validTill" type="date" value={form.validTill} onChange={handleChange} required />
                <div className="flex gap-3 mt-3">
                    <button className="px-4 py-2 bg-accent text-white rounded">Save</button>
                </div>
            </form>
        </div>
    );
}
