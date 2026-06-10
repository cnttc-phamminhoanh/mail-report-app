#!/bin/bash

cd /home/it/mail-report-app

mkdir -p logs

/home/it/.nvm/versions/node/v22.18.0/bin/npm run daily-report >> logs/cron.log 2>&1
