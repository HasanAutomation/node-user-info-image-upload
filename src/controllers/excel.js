const catchAsync = require('../middleware/catchAsync');
const excelService = require('../services/excel.service');
const fs = require('fs/promises');
const Product = require('../models/Product');

exports.parse = catchAsync(async (req, res, next) => {
  const rows = excelService.getExcelSheetRows(req.file.path);
  let product;

  rows.forEach(async row => {
    product = await Product.findOne({ itemNumber: row.itemNumber });

    if (product) {
      await Product.findOneAndUpdate(
        { itemNumber: row.itemNumber },
        { $set: row },
        { new: true }
      );
    } else {
      await Product.create(row);
    }

    const products = await Product.find();

    // To Delete the temporary uploaded csv file
    await fs.unlink(req.file.path);

    res.status(200).json({
      success: true,
      data: {
        products,
      },
    });
  });
});
