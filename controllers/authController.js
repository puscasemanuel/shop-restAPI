const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  });
};

exports.signup = async (req, res) => {
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

    const token = signToken(user.id);
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      httpOnly: true,
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

exports.login = async (req, res) => {
  console.log(req.cookies);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      errors: 'Please provide email and password',
    });
  }
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(user);
    if (!user || !bcrypt.compare(password, user.password)) {
      return res.status(400).json({
        errors: 'Email or password incorrect',
      });
    }

    const token = signToken(user.id);
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    return res.json({
      status: 'success',
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  let user;
  const token = req.cookies.jwt;
  if (token) {
    let user;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (!err) {
        user = await User.findOne({
          where: {
            id: decoded.id,
          },
        });

        if (user) {
          req.user = user;
          return next();
        } else {
          return res.json({
            status: 'fail',
            message: 'Token expired or not belongs to this user',
          });
        }
      }
    });
  } else {
    return res.status(500).json({
      status: 'fail',
      message: 'You have to login first!',
    });
  }
};

exports.checkRole = (req, res, next) => {
  if (req.user.role === 'basic') {
    return res.status(401).json({
      status: 'Not authorized',
      message: "You don't have access to this!",
    });
  } else if (req.user.role === 'admin') {
    next();
  }
};
