#!/bin/bash

# Thời gian chạy: 6:01 AM - HKO Pur: Late Payment Request(Purchasing)

cd /home/it/mail-report-app

mkdir -p excel_reports
mkdir -p logs

JOB_NAME=$1

/home/it/.nvm/versions/node/v22.18.0/bin/node \
src/scripts/run-job.js \
"$JOB_NAME" \
>> logs/${JOB_NAME}.log 2>&1
