import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
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

  const toDateInputValue = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await vehicleService.getById(id);
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
      const payload = {
        ...form,
        validTill: form.validTill
          ? new Date(form.validTill).toISOString()
          : null,
      };

      await vehicleService.update(id, payload);
      toast.success("Vehicle updated successfully!");
      navigate(`/vehicle/${id}`);
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Failed to update vehicle";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Vehicle
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 sm:mt-0 text-sm px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <FaSpinner className="animate-spin" /> Loading...
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Vehicle Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Vehicle Number"
                name="vehicleNumber"
                value={form.vehicleNumber}
                onChange={handleChange}
                placeholder="e.g. MH12LP3162"
              />
              <Input
                label="Pass Number"
                name="passNumber"
                value={form.passNumber}
                onChange={handleChange}
                placeholder="e.g. T-25FC600"
              />
              <Input
                label="Flat Number"
                name="flatNumber"
                value={form.flatNumber}
                onChange={handleChange}
                placeholder="e.g. A-203"
              />
              <Input
                label="Vehicle Type"
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                placeholder="Two-wheeler / Four-wheeler"
              />
              <Input
                label="DL / RC Number"
                name="dlOrRcNumber"
                value={form.dlOrRcNumber}
                onChange={handleChange}
                placeholder="Driving License or RC number"
              />
              <Input
                label="Valid Till"
                name="validTill"
                type="date"
                value={form.validTill}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Owner Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Owner Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Owner Name"
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                placeholder="Full name"
              />
              <Input
                label="Owner Contact"
                name="ownerContact"
                value={form.ownerContact}
                onChange={handleChange}
                placeholder="Primary mobile number"
              />
              <Input
                label="Alternate Contact"
                name="alternateContact"
                value={form.alternateContact}
                onChange={handleChange}
                placeholder="Alternate mobile number"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="owner@example.com"
              />
            </div>
          </div>

          {/* Flat Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Flat / Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Flat Owner Name"
                name="flatOwnerName"
                value={form.flatOwnerName}
                onChange={handleChange}
                placeholder="If rented, landlord name"
              />
              <Input
                label="Flat Owner Contact"
                name="flatOwnerContact"
                value={form.flatOwnerContact}
                onChange={handleChange}
                placeholder="Flat owner contact"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Permanent Address
              </label>
              <textarea
                name="permanentAddress"
                value={form.permanentAddress}
                onChange={handleChange}
                rows={4}
                placeholder="Full permanent address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate(`/vehicle/${id}`)}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading && <FaSpinner className="animate-spin" />}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* 🔹 Reusable Input Component */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>
);
