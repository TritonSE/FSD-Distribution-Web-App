const nodemailer = require("nodemailer");
const Email = require('email-templates');

require('dotenv').config();

const email = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  to: process.env.EMAIL_TO
}

const transporter = email.user === "" ? null : nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: email.user,
    pass: email.pass
  }
});

const mail = email.user === "" ? null : new Email({
  transport: transporter,
  send: true,
  preview: false,
});

/**
 * Responsible for populating an email template and sending to a target email. 
 * 
 * @param template a string referring to one of four templates in the email folder
 * @param email the recipient's email 
 * @param params the template's parameters
 */
async function sendEmail(params) {
  if (mail != null) {
    await mail.send({
      template: 'user-approval',
      message: {
        from: email.user,
        to: email.to,
      },
      locals: params,
    });
    console.log(`Email has been sent`);
  }
  else {
    console.log(`Email would have been sent but is disabled.`);
  }
}

module.exports = { sendEmail };