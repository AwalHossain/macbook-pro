const bodyParser = require("body-parser")
const express = require("express")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()
const cors = require('cors');
const PORT = process.env.PORT || 5000;



const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(
  {
    origin: ['http://localhost:8000', 'https://awalhossain.github.io', 'https://awalhossain.tech'],
    credentials: true
  }
));

const contactAddress = "awalhossainofficial@gmail.com"

const mailer = nodemailer.createTransport({
  host: process.env.HOST, // replace with your SMTP server
  port: 587, // replace with your SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SENDER, 
    pass: process.env.PASS,
  },
})

app.post("/contact", function (req, res) {
  console.log(req.body,"checki", process.env.SENDER,"user", process.env.PASS, process.env.CONTACT_EMAIL);
  const { FNAME, EMAIL, SUBJECT, MESSAGE } = req.body;

  const emailTemplate = `
    <h1>Contact Form Submission</h1>
    <p><strong>Name:</strong> ${FNAME}</p>
    <p><strong>Email:</strong> ${EMAIL}</p>
    <p><strong>Subject:</strong> ${SUBJECT}</p>
    <p><strong>Message:</strong> ${MESSAGE}</p>
  `;
  mailer.sendMail(
    {
      from: process.env.SENDER,
      to: ["awalhossainofficial@gmail.com"],
      subject: SUBJECT || "[No subject]",
      html: emailTemplate || "[No message]",
    },
    function (err, info) {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
      }
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'Email sent successfully.' });
    }
  )
})

app.listen(PORT,()=>{
  console.log('Server is running on port 5000');
})