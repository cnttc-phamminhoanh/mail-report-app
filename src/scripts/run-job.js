require("dotenv").config({
  quiet: process.env.NODE_ENV === "production",
});

const path = require("path");

(async () => {
  const jobName = process.argv[2];

  if (!jobName) {
    throw new Error("Job name is required");
  }

  try {
    console.log(`[${new Date().toISOString()}] [JOB] ${jobName} started`);

    const { execute } = require(path.join(__dirname, `../jobs/${jobName}.job`));

    await execute();

    console.log(`[${new Date().toISOString()}] [JOB] ${jobName} completed`);

    process.exit(0);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [JOB] ${jobName} failed`, err);

    process.exit(1);
  }
})();
