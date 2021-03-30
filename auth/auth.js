const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'phone',
        passwordField: 'password'
      },
      async (phone, password, done) => {
        try {
          const user = await UserModel.create({ phone, password });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
);



passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'phone',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ phone });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
);



passport.use(
    
  new JWTstrategy(
    {
      secretOrKey: process.env.SALT_SECRETE,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);