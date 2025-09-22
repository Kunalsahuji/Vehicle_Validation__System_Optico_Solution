const express = require('express');
const { bootstrapSuperAdmin } = require('../controllers/superAdminController');
const router = express.Router();

router.post('/bootstrap-superadmin', bootstrapSuperAdmin);

module.exports = router;