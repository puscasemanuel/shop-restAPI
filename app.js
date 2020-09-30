const express = require('express');
const { Sequelize } = require('sequelize');
const Product = require('./models/Product');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());
app.use('/public', express.static('public'));

//Product Routes
app.use('/api/v1/products', require('./routes/products'));
// app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/admin', require('./routes/admin'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Application server has started and listening to port ${port}`);
});
