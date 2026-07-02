const sql = require('mssql')
const config = require('../config/database')

let pool

async function getPool() {
  if (pool) {
    return pool
  }

  pool = await sql.connect(config)

  return pool
}

module.exports = {
  getPool
}


