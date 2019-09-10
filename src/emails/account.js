const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//   to: 'khmer.delwyn.9523@gmail.com',
//   from:'khmer.delwyn.9523@gmail.com',
//   subject:'first email',
//   text:'I hope this gets to you'
// })

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from:'test@delwyn.com',
    subject:'Thanks for joining',
    text:`Welcome to the app, ${name}. Let me know how you get along with the app`
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to:email,
    from: 'test@delwyn.com',
    subject:'Sorry to see you go',
    text:`We are sad to see you go ${name}. Goodbye!`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}