const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers'); // <-- ADD IF HELPERS NEEDED

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();
const nodemailer = require('nodemailer');
const log = console.log;

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });  //<-- TODO IF WE NEED HELPERS
// const hbs = exphbs.create();


const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use((req, res) => {
    res.status(404).end();
});

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // TODO: your gmail account 
        pass: process.env.PASSWORD // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'eben21775@gmail.com', // TODO: email sender
    to: 'pratibha.indel@gmail.com', // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!',
    attachments: [
        { filename: 'welcome.png', path: './welcome.png' } // TODO: replace it with your own image
    ]
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs',err);
    }
    return log('Email sent!!!');
});






// use { force: true } if updating the models, then switch back.
sequelize.sync({
    force: false
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});