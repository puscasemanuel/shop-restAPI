const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

const router = express.Router();

const checkRole = (req, res, next) => {
  if (req.user.role === 'basic') {
    return res.status(401).json({
      status: 'Not authorized',
      message: "You don't have access to this!",
    });
  }
  next();
};

router.get('/', authController.protect, checkRole, adminController.test);

module.exports = router;
