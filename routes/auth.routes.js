const express = require('express');
const passport = require('passport');
const router = express.Router();
const indexController = require('../controllers/index.js');
const authController = require('../controllers/auth.controller.js');

// Eg. router.post('/myroute', middleware, controller);
/**
   * @swagger
   * /auth/signup:
   *   post:
   *     description: Signup 
   *     tags: [Auth]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: User Email
   *         in: body
   *         required: true
   *         schema:
   *           type: string
   *       - name: password
   *         description: User's Password
   *         in: body
   *         required: true
   *         schema:
   *           type: string
   *       - name: firstName
   *         description: First Name
   *         in: body
   *         required: true
   *         schema:
   *           type: string
   *       - name: lastName
   *         description: Last Name
   *         in: body
   *         required: true
   *         schema:
   *           type: string  
   *       - name: phone
   *         description: Phone
   *         in: body
   *         required: true
   *         schema:
   *           type: string     
      
   *     responses:
   *       "200":
   *         description: Register
   *         content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/definitions/SignupResponse'
   */  
router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    authController.signup
);

/**
   * @swagger
   * /auth/login:
   *   post:
   *     description: Login 
   *     tags: [Auth]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: User Email
   *         in: body
   *         required: true
   *         schema:
   *           type: string
   *       - name: password
   *         description: User's Password
   *         in: body
   *         required: true
   *         schema:
   *           type: string
      
   *     responses:
   *       "200":
   *         description: Register
   *         content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/definitions/LoginResponse'
   */  
router.post('/login', authController.login);

module.exports = router;