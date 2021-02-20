const express = require('express');
const mongoose = require('mongoose');
const { Agency } = require('../models');
const { body, validationResult } = require('express-validator');
const router = express.Router();

/**
 * Form Validation: validationChain is an array of expected formats for the
 * specified model fields. 
 */
const validationChain = [
    body('billingZipcode').trim().isPostalCode('US'),
    body('contacts.*.contact').trim().not().isEmpty(),
    body('contacts.*.position').trim().not().isEmpty(),
    body('contacts.*.phoneNumber').trim().isMobilePhone('en-US'),
    body('contacts.*.email').trim().isEmail(),
    body('scheduledNextVisit').trim().isDate({ format: 'MM/DD/YYYY' }),
    body('dateOfMostRecentAgreement').trim().isDate({ format: 'MM/DD/YYYY' }),
    body('dateOfInitialPartnership').trim().isDate({ format: 'MM/DD/YYYY' }),
    body('fileAudit').trim().optional({ checkFalsy: true })
        .isDate({ format: 'MM/DD/YYYY' }),
    body('monitored').trim().isDate({ format: 'MM/DD/YYYY' }),
    body('foodSafetyCertification').trim().isDate({ format: 'MM/DD/YYYY' }),
];

/**
 * Route for Put request to create a new Agency in the database
 * 
 * Ex: Put request with localhost:8000/agency/
 * 
 * @params validationChain - the form fields that will be validated
 * @returns the new Agency object created in Json or any form input errors
 */
router.put('/', validationChain, async (req, res, next) => {
    let invalidFields = []; // will contain the names of any invalid fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        invalidFields = errors.array().map((error) => error.param);
    }

    // manually validate against schema with validateSync()
    const agency = new Agency(req.body);
    const schemaErrors = agency.validateSync();
    if (schemaErrors) {
        let fields = Object.values(schemaErrors.errors).map((error) => error.path);
        invalidFields = invalidFields.concat(fields);
    }
    if (invalidFields.length > 0) {
        return res.status(400).json({ fields: invalidFields });
    }
    
    agency.save()
        .then(() => {
            res.status(200).json(agency);
        }).catch(err => {
            next(err);
        });
});

/**
 * Route for Post request to update a current Agency in the database
 * 
 * Ex: Post request with localhost:8000/agency/{object id}
 * 
 * @params the object id of the Agency
 * @params validationChain - the form fields that will be validated
 * @returns the updated Agency object in Json or any form input errors
 */
router.post('/:id', validationChain, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Agency.updateOne({ _id: req.params.id }, req.body).then((agency) => {
        res.status(200).json({ agency: agency });
    }).catch((err) => {
        next(err);
    });
});


/**
 * Route for Get request to read a current Agency in the database
 * 
 * Ex: Get request with localhost:8000/agency/{object id}
 * 
 * @params - the object id of the Agency
 * @returns the fetched Agency object in Json
 */
router.get('/:id', async (req, res, next) => {
    Agency.findById(req.params.id).then((agency) => {
        res.status(200).json({ agency: agency });
    }).catch((err) => {
        next(err);
    });
})

module.exports = router;