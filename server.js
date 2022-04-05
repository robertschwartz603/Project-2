const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers'); // <-- ADD IF HELPERS NEEDED

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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


// use { force: true } if updating the models, then switch back.
sequelize.sync({
    force: false
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});