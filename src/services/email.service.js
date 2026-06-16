const nodemailer = require('nodemailer')
const mailConfig = require('../config/mail')
const { formatDateCN } = require('../utils/date.util')

const transporter = nodemailer.createTransport(mailConfig)

async function sendMail({ to, subject, text, attachments}) {
  await transporter.sendMail({
    from:
      `"GERMTON ERP" <${process.env.MAIL_FROM}>`,
    to,
    subject,
    text,
    attachments
  })
}

module.exports = {
  sendMail,
}
