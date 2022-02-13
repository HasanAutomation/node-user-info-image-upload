const multer = require('multer');
const path = require('path');

class FileService {
  createStorage() {
    return multer.diskStorage({
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
  }

  static checkFileType(file, cb) {
    const filesTypes =
      /jpg|jpeg|png|csv|xlsx|vnd.openxmlformats-officedocument.spreadsheetml.sheet/;
    console.log(file);

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

  getUploadMethod() {
    const upload = multer({
      storage: this.createStorage(),
      fileFilter: function (req, file, cb) {
        FileService.checkFileType(file, cb);
      },
    });
    return upload;
  }
}

module.exports = new FileService();
