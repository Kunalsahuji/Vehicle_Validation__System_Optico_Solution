import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import vehicleService from "../services/vehicleService";

export default function VehicleDetails() {
  const { id } = useParams();
  const [v, setV] = useState(null);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await vehicleService.getById(id);
        setV(res);
      } catch (error) {
        setErr("Failed to load vehicle details");
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await vehicleService.remove(id);
      toast.success("Vehicle deleted successfully!");
      navigate(`/vehicle/${id}`); // redirect back to vehicle details
    } catch (error) {
      toast.error("Failed to delete vehicle");
    }
  };

  if (err) return <div className="text-red-600">{err}</div>;
  if (!v) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto mt-6">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">
        Vehicle Details
      </h3>

      <h2 className="text-2xl font-semibold mb-3">
        {v.vehicleNumber}{" "}
        <span className="text-sm text-gray-500">({v.passNumber})</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div><strong>Vehicle Number:</strong> {v.vehicleNumber}</div>
        <div><strong>Pass Number:</strong> {v.passNumber}</div>
        <div><strong>Flat Number:</strong> {v.flatNumber}</div>
        <div><strong>Owner Name:</strong> {v.ownerName}</div>
        <div><strong>Owner Contact:</strong> {v.ownerContact}</div>
        <div><strong>Flat Owner Name:</strong> {v.flatOwnerName}</div>
        <div><strong>Flat Owner Contact:</strong> {v.flatOwnerContact}</div>
        <div><strong>DL/RC Number:</strong> {v.dlOrRcNumber}</div>
        <div><strong>Vehicle Type:</strong> {v.vehicleType}</div>
        <div><strong>Valid Till:</strong> {new Date(v.validTill).toLocaleDateString()}</div>
        <div className="md:col-span-2">
          <strong>Address</strong>
          <div>{v.permanentAddress}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Link
          to={`/vehicle/${id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
