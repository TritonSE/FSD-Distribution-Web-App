const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { PendingUser, User } = require('../models');
const { sendEmail } = require('../middleware/email');
require('dotenv').config();

const validationChain = [
  body('username').notEmpty().isEmail(),
  body("password").notEmpty().isString().isLength({ min: 6 }),
];

/**
 * Route for Post request to register to the web app
 * 
 * Ex: Post request with localhost:8000/register/
 * 
 * @returns a message
 */
router.post('/',validationChain,
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const pendingUser = new PendingUser({ email: req.body.username, password: req.body.password });
    pendingUser.save()
      .then(async (user) => {
        await sendEmail({ email: user.email, link: `http://localhost:8000/authorize/${user.id}` })
        res.status(200).json(user);
      }).catch(err => {
        next(err);
      });
  }
);

module.exports = router;