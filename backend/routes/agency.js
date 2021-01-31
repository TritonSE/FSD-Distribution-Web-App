const express = require('express');
const mongoose = require('mongoose');
const { Agency } = require('../models');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const validationChain = [
    body('tableContents.phone').trim().isMobilePhone('en-US'),
    body('primaryContact').trim().isMobilePhone('en-US'),
    body('billingZipcode').trim().isPostalCode('US'),
    body('contacts.*.phoneNumber').trim().isMobilePhone('en-US'),
    body('contacts.*.email').trim().isEmail(),
    body('scheduledNextVisit').isISO8601(),
    body('dateOfMostRecentAgreement').trim().isDate(),
    body('dateOfInitialPartnership').trim().isDate(),
    body('fileAudit').trim().isDate(),
    body('monitored').trim().isDate(),
    body('foodSafetyCertification').trim().isDate(),
];

router.put('/', validationChain, async (req, res, next) => {
    // TODO: parse body?
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const agency = new Agency(req.body);
    agency.save()
        .then(() => {
            res.status(200).json(agency);
        }).catch(err => {
            next(err);
        });
});

router.post('/:id', validationChain, async (req, res, next) => {
    // TODO: parse body? 
    
    Agency.updateOne({_id: req.params.id}, req.body).then((agency) => {
        res.status(200).json({ agency: agency });
    }).catch((err) => {
        next(err);
    });
});

router.get('/:id', async (req, res, next) => {
    Agency.findById(req.params.id).then((agency) => {
        res.status(200).json({ agency: agency });
    }).catch((err) => {
        next(err);
    });
})

module.exports = router;