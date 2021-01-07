const express = require('express')

const app = express()
const morgan = require('morgan')
const nodemailer = require('nodemailer')
const port = process.env.PORT || 3000
const path = require('path')

// Antispam protection
const RateLimiter = require('limiter').RateLimiter
const limiter = new RateLimiter(5, 'hour')

const whitelist = [
	'https://connoringold.com/',
	'https://connoringold.com/contact.html',
	'http://connoringoldcontactform.herokuapp.com/contact',
	'http://localhost:3000',
	'https://connoringoldcontactform.herokuapp.com/contact',
]
const cors = require('cors')

// // Middleware
// app.use(function (req, res, next) {
//   if (req.secure) {
//     next()
//   } else {
//     res.redirect('https://' + req.headers.host + req.url);
//   }
// });

app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.json())
app.use(
	cors({
		origin: whitelist,
	})
)

app.post('/contact', (req, res) => {
	// Step one login
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'login',
			user: 'connoringold@gmail.com',
			pass: 'oyrphgbmagibyopt',
		},
	})

	// Step two email content options
	let mailOptions = {
		from: req.body.email,
		to: 'connoringold@gmail.com',
		subject: `Email from ${req.body.name}`,
		text: req.body.message,
	}
	limiter.removeTokens(1, (err, remainingRequests) => {
		console.log('remainingRequests: ', remainingRequests)

		if (remainingRequests < 1) {
			res.writeHead(429, { 'Content-Type': 'text/plain;charset=UTF-8' })
			res.end('429 Too Many Requests - your IP is being rate limited')
		} else {
			// Step three send email
			transporter.sendMail(mailOptions, (err, data) => {
				if (err) {
					console.log('Error Occurs: ', err)
					res.json({ 'error ': err })
				} else {
					console.log('Email sent!!!')
					res.json({ 'email data: ': data })
				}
			})
		}
	})
})

app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname + '/public/projects.html'))
)
app.get('/projects', (req, res) =>
	res.sendFile(path.join(__dirname + '/public/projects.html'))
)
app.get('/contact', (req, res) =>
	res.sendFile(path.join(__dirname + '/public/contact.html'))
)

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
)
