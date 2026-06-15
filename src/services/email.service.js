const nodemailer = require('nodemailer')
const mailConfig = require('../config/mail')
const { formatDateCN } = require('../utils/date.util')

const transporter = nodemailer.createTransport(mailConfig)

async function sendMail(filePath) {
  await transporter.sendMail({
    from: `"GERMTON ERP" <${process.env.MAIL_FROM}>`,
    to: process.env.MAIL_TO,
    subject: `${formatDateCN(new Date())} - GI Sales Shpt Amt vs CUSDEC Amt Discrepencies`,
    text: 'Please refer to the attached report.',
    attachments: [
      {
        filename: 'GI Sales Shpt Amt vs CUSDEC Amt Discrepencies.xlsx',
        path: filePath,
      },
    ],
  })
}

module.exports = {
  sendMail,
}
