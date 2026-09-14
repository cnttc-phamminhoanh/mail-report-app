#!/bin/bash

# Thời gian chạy: 9:00 AM Toy Handbag PO — Undelivered Details (Delivery Date < 3 Days)

cd /home/it/mail-report-app

mkdir -p excel_reports
mkdir -p logs

JOB_NAME=$1

/home/it/.nvm/versions/node/v22.18.0/bin/node \
src/scripts/run-job.js \
"$JOB_NAME" \
>> logs/${JOB_NAME}.log 2>&1
