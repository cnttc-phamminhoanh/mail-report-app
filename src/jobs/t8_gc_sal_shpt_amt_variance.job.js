const query = require("../reports/t8_gc_sal_shpt_amt_variance.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "T8 GC ACCOUNT - SALES SHIPMENT AMOUNT VARIANCE REPORT",
    sheetName: "T8 GC ACCT SAL SHPT VARIANCE",
    mailTo: process.env.T8_GC_SAL_SHPT_AMT_VARIANCE_MAIL_TO,
  });
}

module.exports = {
  execute,
};
