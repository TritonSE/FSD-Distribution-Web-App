const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();

router.post('/', passport.authenticate('local', { session: false }),
    function (req, res, next) {
        res.status(200).json({
            // user: req.user,
            token: jwt.sign(req.user.toJSON(), process.env.SECRET_KEY)
        });
    }
);

module.exports = router;

// {
//     "user": {
//         "_id": "6029dde954347c02476ec910",
//         "username": "steve",
//         "password": "123456"
//     },
//     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MDI5ZGRlOTU0MzQ3YzAyNDc2ZWM5MTAiLCJ1c2VybmFtZSI6InN0ZXZlIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2MTM0MjAwMjF9.v7oShsjPB9i8PoWfzdMD0IXFmj1UaPik5JPQTj_lUbY"
// }