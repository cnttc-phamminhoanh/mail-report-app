const query = require("../reports/sum_exp_mon_rep.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "SUMMARY EXPORT MONTHLY REPORT",
    sheetName: "SUMMARY Report",
    mailTo: process.env.SUM_EXP_MON_REP_MAIL_TO,
  });
}

module.exports = {
  execute,
};