require('dotenv').config()
const { execute } = require('../jobs/daily-report.job');

(async () => {
  try {
    console.log('[JOB] Daily report started')

    await execute()

    console.log('[JOB] Completed successfully')
    process.exit(0)

  } catch (err) {
    console.error('[JOB] Failed:', err)
    process.exit(1)
  }
})()
