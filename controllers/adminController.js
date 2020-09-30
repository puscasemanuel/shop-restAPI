const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const data = {
    title: req.body.title.trim(),
    img: req.body.img.trim(),
    price: req.body.price,
    company: req.body.company.trim(),
    info: req.body.info,
  };

  try {
    const product = await Product.create({
      title: data.title,
      img: data.img,
      price: data.price,
      company: data.company,
      info: data.info,
    });

    res.json({
      status: 'success',
      product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.editProduct = async (req, res) => {
  const id = req.params.id;
  const data = {
    title: req.body.title.trim(),
    img: req.body.img.trim(),
    price: req.body.price,
    company: req.body.company.trim(),
    info: req.body.info,
  };

  try {
    const editedProduct = await Product.update(
      {
        title: data.title,
        img: data.img,
        price: data.price,
        company: data.company,
        info: data.info,
      },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );

    return res.json({
      status: 'success',
      product: editedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteProduct = await Product.destroy({
      where: {
        id: id,
      },
    });

    if (deleteProduct) {
      return res.json({
        status: 'success',
        message: `Product with id: ${id} deleted successfully`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
