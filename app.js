require('dotenv').config()
global.config = require('./config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api.js');
const authRoutes = require('./routes/auth.routes.js');
const passport = require('passport');
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerUi = require("swagger-ui-express");


//var Session = require('express-session');


app.set('port', global.config.port);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/auth', authRoutes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/api', passport.authenticate('jwt', { session: false }), apiRoutes);

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API for SAVIM",
        version: "0.1.0",
        description:
          "Swagger Docs for SAVIM ROSCO",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "SAVIM",
          url: "https://savim.com",
          email: "info@savim.com",
        },
      },
      servers: [
        {
          url: `${global.config.hostname}/${global.config.port}`,
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );

app.listen(global.config.port, global.config.hostname, () => {
    console.log(`Savim is listening on port: ${global.config.port} and host: ${global.config.hostname}`);
});

module.exports = app;