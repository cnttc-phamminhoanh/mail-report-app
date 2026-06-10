#!/bin/bash

cd /home/it/mail-report-app

mkdir -p logs

/home/it/.nvm/versions/node/v22.18.0/bin/node src/scripts/run-daily-report.js >> logs/cron.log 2>&1