const query = require("../reports/garment_po_pending_receive_material_list.report")
const { run } = require("../services/report-runner.service");

async function execute() {
  await run({
    query,
    reportTitle: "Garment PO Pending Receive Materials List",
    sheetName: "Pending Receive Materials",
    mailTo: process.env.GARMENT_PO_PENDING_RECEIVE_MATERIALS_MAIL_TO,
  });
}

module.exports = {
  execute,
}
