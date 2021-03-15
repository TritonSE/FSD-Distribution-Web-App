const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const { PendingUser, User } = require('../models');
const { sendEmail } = require('../middleware/email');
require('dotenv').config();

const validationChain = [
  body('username').notEmpty().isEmail(),
  body('password').notEmpty().isString().isLength({ min: 6 }),
];

/**
 * Route for Post request to register to the web app
 * 
 * Ex: Post request with localhost:8000/register/
 * 
 * @returns a message
 */
router.post('/',validationChain,
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne( { email: req.body.username } ).exec();

    if (user) {
      return res.status(403).json({ errors: "Email already taken" });
    }

    const pendingUser = new PendingUser({ email: req.body.username, password: req.body.password });

    pendingUser.save()
      .then((user) => {
        sendEmail({ email: user.email, link: `${process.env.HOST}/authorize/${user.id}` });
        res.status(200).json(user);
      }).catch((err) => {
        return res.status(403).json({ errors: "User is already pending" });
      });
  }
);

module.exports = router;