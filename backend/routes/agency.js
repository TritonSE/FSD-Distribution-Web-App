const express = require('express');
const mongoose = require('mongoose');
const { Agency } = require('../models');
const router = express.Router();

router.put('/', async (req, res, next) => {
    const Agency = new Agency(req.body);
    Agency.save()
        .then(() => {
            res.status(200).json(Agency);
        }).catch(err => {
            next(err);
        });
});

module.exports = router;