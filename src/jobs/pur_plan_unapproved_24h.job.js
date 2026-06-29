const query = require("../reports/pur_plan_unapproved_24h.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "Purchase Plans Unapproved for Over 24 Hours",
    sheetName: "Purchase Plans Unapproved",
    mailTo: process.env.PUR_PLAN_UNAPPROVED_24H_MAIL_TO,
  });
}

module.exports = {
  execute,
};
