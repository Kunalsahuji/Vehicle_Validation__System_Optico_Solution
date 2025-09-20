const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema(
    {
        vehicleNumber: { type: String, required: true, unique: true },
        passNumber: { type: String, required: true, unique: true },
        flatNumber: { type: String, required: true },
        ownerName: { type: String, required: true },
        dlOrRcNumber: { type: String },
        ownerContact: { type: String, required: true },
        alternateContact: { type: String },
        email: { type: String },
        permanentAddress: { type: String },
        flatOwnerName: { type: String }, // if rented
        validTill: { type: Date, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin/SuperAdmin who added
    },
    { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;