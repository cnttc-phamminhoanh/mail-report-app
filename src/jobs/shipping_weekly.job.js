const query = require("../reports/shipping_weekly.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "SHIPPING DETAIL WEEKLY REPORT",
    sheetName: "SHIPPING DETAIL WEEKLY REPORT",
    mailTo: process.env.SHIPPING_WEEKLY_MAIL_TO,
  });
}

module.exports = {
  execute,
};
