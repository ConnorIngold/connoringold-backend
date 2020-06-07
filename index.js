const express = require('express')

const app = express()
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3000
const path = require('path');

const whitelist = ['https://connoringold.com/', 'https://connoringold.com/contact.html']
const cors = require("cors")

// Middleware
app.use(function (req, res, next) {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
  }
});

app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.json())
app.use(
  cors({
    origin: "https://connoringold.com/",
  })
)

app.post('/contact', (req, res) => {
  // Step one login
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "login",
      user: "connoringold@gmail.com",
      pass: "oyrphgbmagibyopt",
    },
  })

  // Step two email content options
  let mailOptions = {
    from: req.body.email,
    to: "connoringold@gmail.com",
    subject: `Email from ${req.body.name}`,
    text: req.body.message
  }

  // Step three send email
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error Occurs: ", err)
    } else {
      console.log("Email sent!!!")
    }
  })

})


app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/projects.html')))
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname +'/public/projects.html')))
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname + '/public/contact.html')))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))