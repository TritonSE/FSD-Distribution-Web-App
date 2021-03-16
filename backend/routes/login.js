const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

require('dotenv').config();

/**
 * Route for Post request to login to the web app
 * 
 * Ex: Post request with localhost:8000/login/
 * 
 * @params passport local authentication to validate user info in database
 * @returns the username and the Json Webtoken that will be stored in local storage
 */
router.post('/', passport.authenticate('local', { session: false }),
  function (req, res, next) {
    res.status(200).json({
      user: req.user.email,
      token: jwt.sign(req.user.toJSON(), process.env.SECRET_KEY)
    });
  }
);

module.exports = router;