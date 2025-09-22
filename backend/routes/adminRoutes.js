// adminRoutes.js
const express = require('express');
const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const { getAdmins, getAdminById, updateAdmin, deleteAdmin } = require('../controllers/adminController');

const router = express.Router();
router.use(protect);

// both admin & superadmin can view admins
router.get('/', authorizeRoles('admin', 'superadmin'), getAdmins);
router.get('/:id', authorizeRoles('admin', 'superadmin'), getAdminById);

// only superadmin can edit/delete
router.put('/:id', authorizeRoles('superadmin'), updateAdmin);
router.delete('/:id', authorizeRoles('superadmin'), deleteAdmin);

module.exports = router;
