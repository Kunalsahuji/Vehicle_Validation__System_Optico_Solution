const express = require('express');

const protect = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
    searchVehicle
} = require('../controllers/vehicleController');
const router = express.Router();

router.route('/')
    .post(protect, authorizeRoles("superadmin", "admin"), createVehicle)
    .get(protect, authorizeRoles("superadmin", "admin", "security"), getVehicles);

router.route('/:id')
    .get(protect, authorizeRoles("superadmin", "admin", "security"), getVehicleById)
    .put(protect, authorizeRoles("superadmin", "admin"), updateVehicle)
    .delete(protect, authorizeRoles("superadmin"), deleteVehicle);

router.route('/search')
    .get(protect, authorizeRoles("superadmin", "admin", "security"), searchVehicle);
module.exports = router;