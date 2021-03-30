global.config = require('./config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api.js');

app.set('port', global.config.databasePort);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(global.config.databasePort, global.config.hostname, () => {
    console.log(`Savim is listening on port: ${global.config.databasePort} and host: ${global.config.hostname}`);
});

module.exports = app;