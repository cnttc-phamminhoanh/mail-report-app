const { getPool } = require('./sql.service')
const query = require('../reports/gi-sales-shpt.report')

async function getReportData() {
  const pool = await getPool()

  const result = await pool.request().query(query)

  return result.recordset
}

module.exports = {
  getReportData,
}
