const express = require('express');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;