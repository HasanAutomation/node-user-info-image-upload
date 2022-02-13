const express = require('express');
const { body } = require('express-validator');
const { modifyUser, createUser } = require('../controllers/user');
const requestHandle = require('../middleware/requestHandle');
const fileService = require('../services/file.service');
const router = express.Router();

const upload = fileService.getUploadMethod();

router.post(
  '/create',
  upload.single('avatar'),
  body('email').isEmail(),
  body('name').isString(),
  body('password').isStrongPassword(),
  body('phoneNumber').isMobilePhone(),
  requestHandle,
  createUser
);
router.put('/modify', upload.single('avatar'), modifyUser);

module.exports = router;
