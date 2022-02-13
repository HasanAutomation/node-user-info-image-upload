const express = require('express');
const { parse } = require('../controllers/excel');
const fileService = require('../services/file.service');
const router = express.Router();

const upload = fileService.getUploadMethod();

router.post('/parse', upload.single('excel'), parse);

module.exports = router;
