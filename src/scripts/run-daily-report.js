require('dotenv').config({
  quiet: process.env.NODE_ENV = 'production',
})
const { execute } = require('../jobs/daily-report.job');

(async () => {
  try {
    console.log(`[${new Date().toISOString()}] [JOB] Daily report started`)

    await execute()

    console.log(`[${new Date().toISOString()}] [JOB] Completed successfully`)
    process.exit(0)

  } catch (err) {
    console.error(`[${new Date().toISOString()}] [JOB] Failed:`, err)
    process.exit(1)
  }
})()
