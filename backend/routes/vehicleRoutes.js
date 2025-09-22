const express = require('express');
const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  searchVehicle
} = require('../controllers/vehicleController');

const router = express.Router();

// 🔎 Search must come before "/:id"
router.get(
  "/search",
  protect,
  authorizeRoles("superadmin", "admin", "security"),
  searchVehicle
);

router.route('/')
  .post(protect, authorizeRoles("superadmin", "admin"), createVehicle)
  .get(protect, authorizeRoles("superadmin", "admin", "security"), getVehicles);

router.route('/:id')
  .get(protect, authorizeRoles("superadmin", "admin", "security"), getVehicleById)
  .put(protect, authorizeRoles("superadmin", "admin"), updateVehicle)
  .delete(protect, authorizeRoles("superadmin"), deleteVehicle);

module.exports = router;
