const express = require('express');
const router = express.Router();
const adminService = require('../../service/adminService');
const auth = require('../../middleware/auth');

// @route   POST api/admin/admin
// @desc    Create admins
// @access  Public
router.post('/admin', adminService.createAdmin );

// @route   POST api/admin/login
// @desc    allows admins to login
// @access  Public
router.post('/login', adminService.login );

module.exports = router;