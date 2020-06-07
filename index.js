const express = require('express')
const app = express()
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3000
const cors = require("cors")

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(
  cors({
    origin: "http://127.0.0.1:5500/projects.html",
  })
)
app.get('/', (req, res) => res.send('Hello World!'))

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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))