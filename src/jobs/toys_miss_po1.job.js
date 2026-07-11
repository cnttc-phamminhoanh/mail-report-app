const query = require("../reports/toys_miss_po1.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "TOYS Miss PO1 45 Days",
    sheetName: "TOYS Miss PO1 45 Days",
    mailTo: process.env.TOYS_MISS_PO1_MAIL_TO,
  });
}

module.exports = {
  execute,
};
