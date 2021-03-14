const express = require('express');
const router = express.Router();
const { PendingUser, User } = require('../models');
require('dotenv').config();

/**
 * Route for Get request to authorize a user
 * 
 * Ex: Get request with localhost:8000/{Object ID}
 * 
 * @params object id of the pendingUser
 */
router.get('/:id',
  function (req, res, next) {
    PendingUser.findById(req.params.id).then((pendingUser) => {
      const user = new User({email: pendingUser.email, password: pendingUser.password});
      
      // remove user from pendingUsers
      pendingUser.remove();

      // add user to Users
      user.save();
      
      res.status(200).json({msg: `User, ${user.email}, has been authorized!`});
    }).catch((err) => {
      next(err);
    });
  }
);

module.exports = router;