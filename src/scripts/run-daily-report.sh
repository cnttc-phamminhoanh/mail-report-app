#!/bin/bash

cd /opt/mail-report-app

mkdir -p logs

/usr/bin/node src/scripts/run-daily-report.js >> logs/cron.log 2>&1