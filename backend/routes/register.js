const express = require("express");

const router = express.Router();
const { body, validationResult } = require("express-validator");

const { PendingUser, User } = require("../models");
const { sendEmail } = require("../middleware/email");
require("dotenv").config();

const validationChain = [
  body("username").notEmpty().isEmail(),
  body("password").notEmpty().isString().isLength({ min: 6 }),
];

/**
 * Route for Post request to register to the web app
 *
 * Ex: Post request with /register
 *
 * @returns a message
 */
router.post("/", validationChain, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findOne({ email: req.body.username }).exec();

  if (user) {
    return res.status(403).json({ errors: "Email already taken" });
  }

  const pendingUser = new PendingUser({ email: req.body.username, password: req.body.password });

  pendingUser
    .save()
    .then((user_) => {
      sendEmail({ email: user_.email, link: `${req.protocol}://${req.get('host')}/authorize/${user_.id}` });
      res.status(200).json(user_);
    })
    .catch(() => res.status(403).json({ errors: "User is already pending" }));

  return null;
});

module.exports = router;
