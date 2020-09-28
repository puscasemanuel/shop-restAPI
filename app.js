const express = require('express');
const { Sequelize } = require('sequelize');
const Product = require('./models/Product');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const connection = require('./config/database');
require('dotenv').config();

//DB connection
connection();

app.use(
  require('cors')({
    origin: true,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Product Routes
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/users', require('./routes/users'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Application server has started and listening to port ${port}`);
});
