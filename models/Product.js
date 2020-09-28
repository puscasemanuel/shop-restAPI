const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();
const db = new Sequelize(process.env.DATABASE);

const Product = db.define('products', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  info: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Product;
