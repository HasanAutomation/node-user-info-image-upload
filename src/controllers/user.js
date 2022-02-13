const catchAsync = require('../middleware/catchAsync');
const User = require('../models/User');
const userService = require('../services/user.service');
const AppError = require('../util/AppError');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;

  const imagePath = `${req.protocol}://${req.hostname}:${
    process.env.PORT || 5000
  }/uploads/${req.file.filename}`;

  const userExists = await userService.findUser({ email });
  if (userExists) return next(new AppError('Email is taken', 400));

  //   Upload profile picture

  const user = await userService.createUser({
    name,
    email,
    profileImage: imagePath,
    password,
    phoneNumber,
  });
  user.password = undefined;

  res.status(201).json({
    success: true,
    data: {
      user,
    },
    errors: [],
  });
});

exports.modifyUser = catchAsync(async (req, res, next) => {
  console.log(req.body.email);
  const userExists = await userService.findUser({ email: req.body.email });
  if (!userExists) return next(new AppError('User does not exist', 404));

  if (req.file) {
    req.body.profileImage = `${req.protocol}://${req.hostname}:${
      process.env.PORT || 5000
    }/uploads/${req.file.filename}`;
  }

  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    { $set: req.body },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: {
      user,
    },
    errors: [],
  });
});
