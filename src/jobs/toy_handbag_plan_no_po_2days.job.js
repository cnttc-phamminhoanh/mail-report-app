const query = require("../reports/toy_handbag_plan_no_po_2days.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "TOY HANDBAG - PLANNED BUT NO PO ALERT (2 DAYS)",
    sheetName: "TOY HANDBAG PLAN NO PO 2D",
    mailTo: process.env.TOY_HANDBAG_PLAN_NO_PO_2DAYS_MAIL_TO,
  });
}

module.exports = {
  execute,
}
