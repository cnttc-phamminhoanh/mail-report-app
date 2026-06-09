const nodemailer = require('nodemailer')
const mailConfig = require('../config/mail')
const transporter = nodemailer.createTransport(mailConfig)
const { formatDateCN } = require('../utils/date.util')

async function sendMail(filePath) {
  await transporter.sendMail({
    from: `"GERMTON ERP" <${process.env.MAIL_FROM}>`,
    to: process.env.MAIL_TO,
    subject: `在 ${formatDateCN(
      new Date()
    )} 时执行 GI Sales Shpt Amt vs CUSDEC Amt Discrepencies`,

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
