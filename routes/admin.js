const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  '/',
  authController.protect,
  authController.checkRole,
  upload.single('productImage'),
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
