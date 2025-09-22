import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import vehicleService from "../services/vehicleService";

export default function EditVehiclePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        vehicleNumber: "",
        passNumber: "",
        flatNumber: "",
        ownerName: "",
        ownerContact: "",
        alternateContact: "",
        email: "",
        permanentAddress: "",
        flatOwnerName: "",
        flatOwnerContact: "",
        dlOrRcNumber: "",
        vehicleType: "",
        validTill: "",
    });

    const [loading, setLoading] = useState(false);

    // helper to convert incoming date to yyyy-mm-dd for input[type=date]
    const toDateInputValue = (date) => {
        if (!date) return "";
        const d = new Date(date);
        // handle invalid date
        if (isNaN(d.getTime())) return "";
        return d.toISOString().slice(0, 10);
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await vehicleService.getById(id);
                // fill form with response (safely)
                setForm({
                    vehicleNumber: res.vehicleNumber || "",
                    passNumber: res.passNumber || "",
                    flatNumber: res.flatNumber || "",
                    ownerName: res.ownerName || "",
                    ownerContact: res.ownerContact || "",
                    alternateContact: res.alternateContact || "",
                    email: res.email || "",
                    permanentAddress: res.permanentAddress || "",
                    flatOwnerName: res.flatOwnerName || "",
                    flatOwnerContact: res.flatOwnerContact || "",
                    dlOrRcNumber: res.dlOrRcNumber || "",
                    vehicleType: res.vehicleType || "",
                    validTill: toDateInputValue(res.validTill),
                });
            } catch (error) {
                toast.error("Failed to load vehicle details");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // basic validation
        if (!form.vehicleNumber.trim()) {
            toast.error("Vehicle Number is required");
            return;
        }
        if (!form.passNumber.trim()) {
            toast.error("Pass Number is required");
            return;
        }
        if (!form.ownerName.trim()) {
            toast.error("Owner Name is required");
            return;
        }

        try {
            setLoading(true);

            // Prepare payload — ensure validTill is a proper ISO date if present
            const payload = {
                ...form,
                validTill: form.validTill ? new Date(form.validTill).toISOString() : null,
            };

            await vehicleService.update(id, payload);
            toast.success("Vehicle updated successfully!");
            navigate(`/vehicle/${id}`);
        } catch (error) {
            const msg = error?.response?.data?.message || "Failed to update vehicle";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg mt-6 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Edit Vehicle</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm px-3 py-1 border rounded hover:bg-gray-50"
                >
                    Cancel
                </button>
            </div>

            {loading && <div className="text-sm text-gray-500 mb-4">Loading...</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
                        <input
                            name="vehicleNumber"
                            value={form.vehicleNumber}
                            onChange={handleChange}
                            placeholder="e.g. MH12LP3162"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pass Number</label>
                        <input
                            name="passNumber"
                            value={form.passNumber}
                            onChange={handleChange}
                            placeholder="e.g. T-25FC600"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Flat Number</label>
                        <input
                            name="flatNumber"
                            value={form.flatNumber}
                            onChange={handleChange}
                            placeholder="e.g. A-203"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                        <input
                            name="vehicleType"
                            value={form.vehicleType}
                            onChange={handleChange}
                            placeholder="e.g. Two-wheeler / Four-wheeler"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                        <input
                            name="ownerName"
                            value={form.ownerName}
                            onChange={handleChange}
                            placeholder="Owner full name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Owner Contact</label>
                        <input
                            name="ownerContact"
                            value={form.ownerContact}
                            onChange={handleChange}
                            placeholder="Primary mobile number"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Contact</label>
                        <input
                            name="alternateContact"
                            value={form.alternateContact}
                            onChange={handleChange}
                            placeholder="Alternate mobile number"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Flat Owner Name</label>
                        <input
                            name="flatOwnerName"
                            value={form.flatOwnerName}
                            onChange={handleChange}
                            placeholder="If rented, landlord name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Flat Owner Contact</label>
                        <input
                            name="flatOwnerContact"
                            value={form.flatOwnerContact}
                            onChange={handleChange}
                            placeholder="Flat owner contact"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">DL / RC Number</label>
                        <input
                            name="dlOrRcNumber"
                            value={form.dlOrRcNumber}
                            onChange={handleChange}
                            placeholder="Driving License or RC number"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="owner@example.com"
                            type="email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Valid Till</label>
                        <input
                            name="validTill"
                            value={form.validTill}
                            onChange={handleChange}
                            type="date"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
                    <textarea
                        name="permanentAddress"
                        value={form.permanentAddress}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Full permanent address"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                </div>

                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(`/vehicle/${id}`)}
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-70"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
