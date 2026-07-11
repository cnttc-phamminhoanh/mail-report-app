const query = require("../reports/late_pay_req_pur.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "Late Payment Request (Purchasing)",
    sheetName: "LATE Report",
    mailTo: process.env.LATE_PAY_REQ_PUR_MAIL_TO,
  });
}

module.exports = {
execute,
};
