const express = require('express');
const mongoose = require('mongoose');
const { Agency } = require('../models');
const { body } = require('express-validator');
const router = express.Router();

const validationChain = [
    body('tableContents.phone').isMobilePhone('any'),
    body('primaryContact').isMobilePhone('any'),
    body('billingZipcode').isPostalCode('any'),
    body('contacts.*.phoneNumber').isMobilePhone('any'),
    body('contact.*.email').isEmail(),
    body('scheduledNextVisit').isDate([{format: 'MM/DD/YYYY'}]),
    body('dateOfMostRecentAgreement').isDate([{format: 'MM/DD/YYYY'}]),
    body('dateOfInitialPartnership').isDate([{format: 'MM/DD/YYYY'}]),
    body('fileAudit').isDate([{format: 'MM/DD/YYYY'}]),
    body('monitored').isDate([{format: 'MM/DD/YYYY'}]),
    body('foodSafetyCertification').isDate([{format: 'MM/DD/YYYY'}]),
];

router.put('/', validationChain, async (req, res, next) => {
    // TODO: parse body? 

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