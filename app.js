require('dotenv').config()
global.config = require('./config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api.js');
const authRoutes = require('./routes/auth.routes.js');
const passport = require('passport');


//var Session = require('express-session');


app.set('port', global.config.port);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/auth', authRoutes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/api', passport.authenticate('jwt', { session: false }), apiRoutes);

app.listen(global.config.port, global.config.hostname, () => {
    console.log(`Savim is listening on port: ${global.config.port} and host: ${global.config.hostname}`);
});

module.exports = app;