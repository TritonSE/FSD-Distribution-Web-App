/**
 * File contains the middleware that will be used for every network request
 * for passport authentication.
 */

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const { User } = require("../models");
require("dotenv").config();

const options = {
  /**
   * Expecting authorization header to follow the format...
   * Authorization: Bearer <token>
   */
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

module.exports = () => {
  /**
   * Validating user login by checking whether the user and the corresponding
   * password exists in the database
   */
  passport.use(
    new LocalStrategy((email, password, next) => {
      User.findOne({ email })
        .exec()
        .then((user_) => {
          if (!user_) {
            return next(null, false);
          }
          if (!user_.verifyPassword(password)) {
            return next(null, false);
          }
          return next(null, user_);
        });
    })
  );

  /**
   * Validating the Json Web Token passed in from network requests
   */
  passport.use(
    new JwtStrategy(options, (jwt_payload, next) => {
      User.findById(jwt_payload._id, (err, email) => {
        if (err) {
          return next(err, false);
        }
        if (email) {
          return next(null, email);
        }
        return next(null, false);
      });
    })
  );

  /**
   * Serializing the user to be saved in the session
   */
  passport.serializeUser((email, next) => {
    next(null, email);
  });

  /**
   * Deserializing the user when user object is being fetched
   */
  passport.deserializeUser((email, next) => {
    next(null, email);
  });
};
