const query = require("../reports/sal_shpt_cus_dis.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "GI Sales Shpt Amt vs CUSDEC Amt Discrepencies",
    sheetName: "CUSDEC Report",
    mailTo: process.env.SAL_SHPT_CUS_DIS_MAIL_TO,
  });
}

module.exports = {
  execute,
};
