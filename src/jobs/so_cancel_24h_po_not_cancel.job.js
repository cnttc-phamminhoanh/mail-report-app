const query = require("../reports/so_cancel_24h_po_not_cancel.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "SO CANCELLATION EXCEEDS 24H- PO NOT CANCELED",
    sheetName: "SO CANCELLATION EXCEEDS 24H",
    mailTo: process.env.SO_CANCEL_24H_PO_NOT_CANCEL_MAIL_TO,
  });
}

module.exports = {
  execute,
};
