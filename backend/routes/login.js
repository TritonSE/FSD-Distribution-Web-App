const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();

router.post('/', passport.authenticate('local', { session: false }),
  function (req, res, next) {
    res.status(200).json({
      user: req.user.email,
      token: jwt.sign(req.user.toJSON(), process.env.SECRET_KEY)
    });
  }
);

module.exports = router;