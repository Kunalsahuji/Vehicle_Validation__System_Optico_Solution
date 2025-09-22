import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
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
      navigate("/vehicles"); // Redirect to list page after delete
    } catch (error) {
      toast.error("Failed to delete vehicle");
    }
  };

  if (err)
    return <div className="text-center text-red-600 font-medium mt-6">{err}</div>;

  if (!v)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <div className="bg-white shadow-xl rounded-xl max-w-3xl mx-auto p-6 md:p-8">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-3">
          Vehicle Details
        </h3>

        {/* Vehicle Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-700">
            {v.vehicleNumber}
          </h2>
          <p className="text-gray-500">Pass No: {v.passNumber}</p>
        </div>

        {/* Vehicle Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Info label="Vehicle Number" value={v.vehicleNumber} />
          <Info label="Pass Number" value={v.passNumber} />
          <Info label="Flat Number" value={v.flatNumber} />
          <Info label="Owner Name" value={v.ownerName} />
          <Info label="Owner Contact" value={v.ownerContact} />
          <Info label="Flat Owner Name" value={v.flatOwnerName} />
          <Info label="Flat Owner Contact" value={v.flatOwnerContact} />
          <Info label="DL/RC Number" value={v.dlOrRcNumber} />
          <Info label="Vehicle Type" value={v.vehicleType} />
          <Info
            label="Valid Till"
            value={new Date(v.validTill).toLocaleDateString()}
          />
          <div className="sm:col-span-2">
            <Info label="Address" value={v.permanentAddress} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          <Link
            to={`/vehicle/${id}/edit`}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaEdit /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ✅ Reusable Info Component */
const Info = ({ label, value }) => (
  <div className="p-3 border rounded-lg hover:shadow-md transition bg-gray-50">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value || "N/A"}</p>
  </div>
);
