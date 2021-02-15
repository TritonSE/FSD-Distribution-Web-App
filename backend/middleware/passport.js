const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { User } = require('../models');
require('dotenv').config();

const options = {
    /**
     * Expecting authorization header to follow the format...
     * Authorization Header: bearer <token>
     */
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};

module.exports = () => {
    passport.use(new LocalStrategy(
        (username, password, next) => {
            User.findOne({ username: username }).exec().then((user) => {
                if (!user) {
                    return next(null, false);
                }
                if (!user.verifyPassword(password)) {
                    return next(null, false);
                }
                return next(null, user);
            });
        }
    ));

    passport.use(new JwtStrategy(options,
        (jwt_payload, next) => {
            User.findOne({ _id: jwt_payload._id }, (err, user) => {
                if (err) {
                    return next(err, false);
                }
                if (user) {
                    return next(null, user);
                }
                return next(null, false);
            });
        }
    ));

    passport.serializeUser(function (user, next) {
        next(null, user);
    });

    passport.deserializeUser(function (user, next) {
        next(null, user);
    });
};