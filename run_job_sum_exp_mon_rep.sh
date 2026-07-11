#!/bin/bash

# Thời gian chạy: 5:03 AM - HKO 0629 Done Finance: SUMMARY EXPORT MONTHLY REPORT

cd /home/it/mail-report-app

mkdir -p excel_reports
mkdir -p logs

JOB_NAME=$1

/home/it/.nvm/versions/node/v22.18.0/bin/node \
src/scripts/run-job.js \
"$JOB_NAME" \
>> logs/${JOB_NAME}.log 2>&1
