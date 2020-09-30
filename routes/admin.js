const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/',
  authController.protect,
  authController.checkRole,
  adminController.addProduct
);
router.put(
  '/:id',
  authController.protect,
  authController.checkRole,
  adminController.editProduct
);
router.delete(
  '/:id',
  authController.protect,
  authController.checkRole,
  adminController.deleteProduct
);

module.exports = router;
