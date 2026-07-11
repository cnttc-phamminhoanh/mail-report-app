const query = require("../reports/sal_order_pending_mps_72h.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "Orders Pending Master Plan for Over 72 Hours",
    sheetName: "Orders Pending mps 72h",
    mailTo: process.env.ORDERS_PENDING_MPS_72H_MAIL_TO,
  });
}

module.exports = {
  execute,
};