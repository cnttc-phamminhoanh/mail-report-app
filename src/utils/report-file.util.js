const path = require('path');

function createReportFile(reportName) {
  const timestamp = new Date().toISOString().replace(/:/g, '-');

  return path.join(__dirname, '../../excel_reports', `${reportName}_${timestamp}.xlsx`);
}

module.exports = {
  createReportFile
}
