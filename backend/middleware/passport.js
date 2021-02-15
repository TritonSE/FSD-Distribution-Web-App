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
        function(username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) {
                    return done(err); 
                }
                if (!user) {
                    return done(null, false); 
                }
                if (!user.verifyPassword(password)) {
                    return done(null, false); 
                }
                return done(null, user);
            });
        }
    ));

    passport.use(new JwtStrategy(options, 
        function(jwt_payload, done) {
            User.findOne({ _id: jwt_payload._id }, function(err, user) {
                if (err) {
                    return done(error, false);
                }
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            });
        }
    ));
};