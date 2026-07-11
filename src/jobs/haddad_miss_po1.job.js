const query = require("../reports/haddad_miss_po1.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "HADDAD Miss PO1 45  Days",
    sheetName: "HADDAD Miss PO1 45  Days",
    mailTo: process.env.HADDAD_MISS_PO1_MAIL_TO,
  });
}

module.exports = {
  execute,
};
