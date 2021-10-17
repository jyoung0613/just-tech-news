// Backend required dependencies
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
// Front end dependency
const path = require('path');
// added to use handlebars for html
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
// adding express-session and sequelize store
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


// Express 
const app = express();
const PORT = process.env.PORT || 3001;

// middleware for backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// adding middleware for public folder to send front end files
app.use(express.static(path.join(__dirname, 'public')));
// adding handlebars for generating html
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// middleware for sessions
app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});