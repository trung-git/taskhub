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
    this.from = `Task Hub <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV.trim() === 'production') {
    //   return nodemailer.createTransport({
    //     service: 'SendGrid',
    //     auth: {
    //       user: process.env.SEND_GRID_USERNAME,
    //       pass: process.env.SEND_GRID_PASSWORD,
    //     },
    //   });
    // }
    //use mailTrap
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = await ejs.renderFile(
      `${__dirname}/../views/emails/index.ejs`,
      {
        template,
        firstname: this.firstname,
        url: this.url,
        subject,
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

  // async sendWelcome() {
  //   await this.send('welcome', 'Welcome to the Task Hub!');
  // }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Reset your password {valid only 10 minutes}'
    );
  }
};