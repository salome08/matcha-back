'use strict';
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const smtpTransport = require('nodemailer-smtp-transport');

// create reusable transport method (opens pool of SMTP connections)
const transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: process.env.ENV_MAIL,
        clientId: '200158904563-im5png9vrok4h99p3uiph92le9cnj4h9.apps.googleusercontent.com',
        clientSecret: 'qOugDd8YIjNLXHFHoB57yJl0',
        refreshToken: '1/Sc6Us3iKHqXWQlL3YniPUhkZeUfUDxP8hoP5t2qqj4Q'
      })

    }
}));

function sendConfirmationMail(email, token){

  // setup e-mail data with unicode symbols
  const mailOptions = {
      from: "Matcha ✔ <" + process.env.ENV_MAIL + ">", // sender address
      to: email, // list of receivers
      subject: "Account Verification Token", // Subject line
      text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/localhost:3000/mails\/confirmation?id='+ token.user_id + '&token=' + token.token + '.\n' // plaintext body
      // html: "<b>Hello world ✔</b>" + token // html body
  }

  // send mail with defined transport object
  return (transporter.sendMail(mailOptions));
}

function sendForgotPasswordMail(login, email, token){
  // setup e-mail data with unicode symbols
  const mailOptions = {
      from: "Matcha ✔ <" + process.env.ENV_MAIL + ">", // sender address
      to: email, // list of receivers
      subject: "Account Forgot Password", // Subject line
      text: 'Hello ' + login + ', \n\n' + 'Reset your password by clicking the link: \nhttp:\/\/localhost:8080/resetPassword?id=' + token.user_id + '&token=' + token.token + '.\n' // plaintext body
      // html: "<b>Hello world ✔</b>" + token // html body
  }

  // send mail with defined transport object
  return (transporter.sendMail(mailOptions));
}

module.exports = {
  sendConfirmationMail,
  sendForgotPasswordMail
}
