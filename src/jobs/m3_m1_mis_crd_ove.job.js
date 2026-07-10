const query = require("../reports/m3_m1_mis_crd_ove.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "MRP for M3&M1 Missing – CRD Overdue",
    sheetName: "M3&M1 Report",
    mailTo: process.env.M3_M1_MIS_CRD_OVER_MAIL_TO,
  });
}

module.exports = {
  execute,
};