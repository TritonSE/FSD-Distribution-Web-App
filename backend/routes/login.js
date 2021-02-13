const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { isValidated } = require('../middleware/validation');
require('dotenv').config();

router.post('/login', passport.authenticate('local', { session: false }), 
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        res.status(200).json({
            user: req.user,
            token: jwt.sign(req.user.toJSON(), process.env.SECRET_KEY)
        });
    }
);

module.exports = router;