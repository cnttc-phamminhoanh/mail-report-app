const path = require('path')
const fs = require('fs/promises')
const { getReportData } = require('../services/report.service')
const { generateExcel } = require('../services/excel.service')
const { sendMail } = require('../services/email.service')

async function execute() {
  const data = await getReportData()

  const filePath = path.join(__dirname, '../../excel_reports/GI Sales Shpt Amt vs CUSDEC Amt Discrepencies.xlsx')

  await generateExcel(data, filePath)
  console.log(`[${new Date().toISOString()}] [REPORT] Excel generated`)

  await sendMail(filePath)
  console.log(`[${new Date().toISOString()}] [MAIL] Report sent successfully`)

  await fs.unlink(filePath)
}

module.exports = {
  execute,
}
