const XLSX = require('xlsx');
class ExcelService {
  getExcelSheetRows(path) {
    const workbook = XLSX.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    return XLSX.utils.sheet_to_json(worksheet);
  }
}
module.exports = new ExcelService();
