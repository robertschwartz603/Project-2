require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // TODO: your gmail account 
        pass: process.env.PASSWORD// TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'eben21775@gmail.com', // TODO: email sender
    to: 'pratibha.indel@gmail.com', // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!',
    attachments: [
        { filename: 'welcome.webp', path: './welcome.webp' } // TODO: replace it with your own image
    ]
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs');
    }
    return log('Email sent!!!');
});