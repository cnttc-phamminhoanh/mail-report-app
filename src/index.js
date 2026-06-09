require('dotenv').config()
const { execute } = require('./jobs/daily-report.job')

execute()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)

    process.exit(1)
  })
