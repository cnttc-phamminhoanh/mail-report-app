const query = require("../reports/po_undelivered_3days.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "Toy Handbag PO - Undelivered Details  3 Days",
    sheetName: "Toy Handbag PO Undelivered",
    mailTo: process.env.PO_UNDELIVERED_3DAYS_MAIL_TO,
  });
}

module.exports = {
  execute,
};
