const query = require("../reports/next_miss_po1.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "NEXT Miss PO1 45 Days",
    sheetName: "NEXT Miss PO1 45 Days",
    mailTo: process.env.NEXT_MISS_PO1_MAIL_TO,
  });
}

module.exports = {
  execute,
};
