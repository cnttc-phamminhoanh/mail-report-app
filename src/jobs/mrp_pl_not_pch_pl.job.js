const query = require("../reports/mrp_pl_not_ch_pl.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "PMC: MRP Plan does not generate Purchase Plan",
    sheetName: "MRP Plan does not generate Purchase Plan",
    mailTo: process.env.MRP_PL_NOT_PCH_PL_MAIL_TO,
  });
}

module.exports = {
  execute,
};
