const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.editUser = async (req, res) => {
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
    confirmNewPassword: req.body.confirmNewPassword,
  };

  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  });

  if (oldPassword && bcrypt.compare(oldPassword, user.password)) {
    if (confirmNewPassword === newPassword) {
      const newpassword = await bcrypt.hash(data.newPassword, 12);
      const updatePassword = await User.update({
        password: newpassword,
        where: {
          id: req.user.id,
        },
      });

      return res.json({
        status: 'success',
        messag: 'Password changed successfully!',
      });
    } else {
      return res.json({
        status: 'fail',
        message: `Password doesn't match, try again!`,
      });
    }
  } else {
    return res.json({
      status: 'fail',
      message: 'Old password is incorrect!',
    });
  }
};
