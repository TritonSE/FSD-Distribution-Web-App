const express = require('express');
const router = express.Router();
const { PendingUser } = require('../models');
const { sendEmail } = require('../middleware/email');
require('dotenv').config();

/**
 * Route for Post request to register to the web app
 * 
 * Ex: Post request with localhost:8000/register/
 * 
 * @returns a message
 */
router.post('/',
  function (req, res, next) {
    // TODO validate user

    const pendingUser = new PendingUser({ email: req.body.username, password: req.body.password });
    pendingUser.save()
      .then(async (user) => {
        await sendEmail({ email: user.email, link: 'google.com' })
        res.status(200).json(user);
      }).catch(err => {
        next(err);
      });
  }
);

module.exports = router;