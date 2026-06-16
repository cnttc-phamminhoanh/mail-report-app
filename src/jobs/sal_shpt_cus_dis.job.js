const query = require("../reports/gi-sales-shpt.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "GI Sales Shpt Amt vs CUSDEC Amt Discrepencies",
    sheetName: "CUSDEC Report",
    mailTo: process.env.MAIL_TO,
  });
}

module.exports = {
  execute,
};
