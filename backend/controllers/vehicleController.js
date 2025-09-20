const Vehicle = require('../models/vehicleModel');
exports.createVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create({ ...req.body, createdBy: req.user._id });
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Failed to create vehicle", error: error.message });
    }
}
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve vehicles", error: error.message });
    }
}
exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve vehicle", error: error.message });
    }
}
exports.updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Failed to update vehicle", error: error.message });
    }
}
exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(204).json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete vehicle", error: error.message });
    }
}
exports.searchVehicle = async (req, res) => {
    const { query } = req.query; // ?query=3162 or ?query=T25FC600

    if (!query) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        // Normalize query (remove spaces, uppercase for consistency)
        const normalizedQuery = query.replace(/\s+/g, "").toUpperCase();

        const vehicle = await Vehicle.findOne({
            $or: [
                // Match full/partial vehicleNumber (case-insensitive)
                { vehicleNumber: { $regex: normalizedQuery, $options: "i" } },

                // Match full/partial passNumber (case-insensitive)
                { passNumber: { $regex: normalizedQuery, $options: "i" } },
            ],
        });

        if (!vehicle || vehicle.length === 0) return res.status(404).json({ message: "No vehicle found" });
        if (!vehicle || vehicle.createdBy.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "No vehicle found" });
        }

        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Failed to search vehicle", error: error.message });
    }
};