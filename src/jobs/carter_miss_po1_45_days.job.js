const query = require("../reports/carter_miss_po1_45_days.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "CARTER'S Miss PO1 45 Days ",
    sheetName: "CARTER Report",
    mailTo: process.env.CARTER_MAIL_TO,
  });
}

module.exports = {
  execute,
};
