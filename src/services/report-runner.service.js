const fs = require("fs/promises");
const { executeQuery } = require("./report.service");
const { generateExcel } = require("./excel.service");
const { sendMail } = require("./email.service");
const { createReportFile } = require("../utils/report-file.util")
const { formatDateCN } = require("../utils/date.util")


async function run({ query, reportTitle, sheetName, mailTo }) {
  const data = await executeQuery(query);

  const filePath = createReportFile(reportTitle);

  await generateExcel(data, filePath, {
    reportTitle,
    sheetName,
  });
  console.log(`[${new Date().toISOString()}] [REPORT] Excel generated`)

  await sendMail({
    to: mailTo,
    subject: `${formatDateCN(new Date())} - ${reportTitle}`,
    text: "Please refer to the attached report.",
    attachments: [
      {
        filename: `${reportTitle}.xlsx`,
        path: filePath,
      },
    ],
  });
  console.log(`[${new Date().toISOString()}] [MAIL] Report sent successfully`)

  await fs.unlink(filePath);
}

module.exports = {
  run,
}
