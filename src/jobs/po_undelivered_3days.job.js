const query = require("../reports/po_undelivered_3days.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "TOY HANDBAG PO — UNDELIVERED DETAILS DELIVERY DATE 3 DAYS",
    sheetName: "TOY HANDBAG PO UNDELIVERED",
    mailTo: process.env.PO_UNDELIVERED_3DAYS_MAIL_TO,
  });
}

module.exports = {
  execute,
};
