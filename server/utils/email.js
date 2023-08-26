const nodemailer = require('nodemailer');
const ejs = require('ejs');
const htmlToText = require('html-to-text');
const options = {
  wordwrap: 130,
};
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstname = user.firstName;
    this.url = url;
    this.from = `Task Hub`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject, code = undefined) {
    const html = await ejs.renderFile(
      `${__dirname}/../views/emails/index.ejs`,
      {
        template,
        firstname: this.firstname,
        url: this.url,
        subject,
        code
      }
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText.convert(html, options),
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Task Hub!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Reset your password {valid only 10 minutes}'
    );
  }

  async sendVerifyEmailCode(code) {
    await this.send('sendVerifyEmailCode', 'Verify your Email {valid only 10 minutes}', code);
  }
};