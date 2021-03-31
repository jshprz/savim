var User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Display list of all Authors.
exports.signup = async function signup(req, res, next) {
    return res.json({
        success: true,
        message: 'Signup successful',
        user: req.user
    });
};

exports.login = async (req, res, next) => {

    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);
              const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 1);
              const body = { _id: user._id, phone: user.phone }; // remove unneeded info
              const token = jwt.sign({ 
                  expiresIn,
                  user: body }, process.env.SALT_SECRETE);

              return res.json({
                success: true,
                message: 'Logged In',
                token,
                expiresIn
              });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);

}