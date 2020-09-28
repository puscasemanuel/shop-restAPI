const Product = require('../models/Product');

exports.allProducts = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.json({
      status: 'success',
      products: product.length,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.productById = async (req, res) => {
  try {
    const product = await Product.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};
