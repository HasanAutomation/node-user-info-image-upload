const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

function checkFileType(file, cb) {
  const filesTypes = /jpg|jpeg|png/;
  const extname = filesTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = filesTypes.test(file.mimetype);
  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb({ message: 'Images Only' });
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('avatar'), (req, res) => {
  console.log('Req.file', req.file);
  res.send('ok');
});

module.exports = router;
