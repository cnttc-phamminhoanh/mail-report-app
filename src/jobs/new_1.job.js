const query = require("../reports/new_1.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "TEST NEW 1 Title",
    sheetName: "TEST sheet>",
    mailTo: process.env.NEW_1_MAIL_TO,
  });
}

module.exports = {
  execute,
};