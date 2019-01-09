'use strict';
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const smtpTransport = require('nodemailer-smtp-transport');


function sendConfirmationMail(user, token){
  // create reusable transport method (opens pool of SMTP connections)
  console.log(user.email);
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

  // setup e-mail data with unicode symbols
  const mailOptions = {
      from: "Matcha ✔ <" + process.env.ENV_MAIL + ">", // sender address
      to: user.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world j'ai reussi haha ✔", // plaintext body
      html: "<b>Hello world ✔</b>" // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }

      // if you don't want to use this transport object anymore, uncomment following line
      //smtpTransport.close(); // shut down the connection pool, no more messages
  });
}

module.exports = {
  sendConfirmationMail
}
