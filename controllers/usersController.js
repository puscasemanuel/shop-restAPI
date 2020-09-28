const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };
  if (data) {
    if (data.password === data.confirmPassword) {
      data.password = await bcrypt.hash(data.password, 12);
    } else {
      return res.json({
        status: 'fail',
        err: 'Passwords are not the same',
      });
    }
  } else {
    return res.json({
      status: 'fail',
      err: 'Empty data',
    });
  }

  try {
    const user = await User.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    });

    if (user) {
      return res.json({
        status: 'success',
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};
