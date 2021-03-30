const express = require('express');
const passport = require('passport');
const router = express.Router();
const indexController = require('../controllers/index.js');
const authController = require('../controllers/auth.controller.js');

// Eg. router.post('/myroute', middleware, controller);
router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;