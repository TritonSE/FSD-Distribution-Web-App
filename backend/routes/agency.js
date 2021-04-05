const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const { isAuthenticated } = require("../middleware/auth");
const { Agency } = require("../models");
const router = express.Router();

/**
 * Validates the distribution start time for the given day if the day is
 * selected, using express-validator. Expects the format "HH:mm AM".
 * @param {String} day Day of the week to check ("monday", "tuesday", etc.)
 */
const validateDistributionStartTime = (day) =>
  body(`distributionStartTimes.${day}`)
    .trim()
    .if((value, { req }) => req.body.distributionDays[day])
    .custom((value) => {
      // custom time format
      return value.match(/^(0[1-9]|1[0-2]):([0-5][0-9]) [AP]M$/);
    });

/**
 * Form Validation: validationChain is an array of expected formats for the
 * specified model fields.
 */
const validationChain = [
  body("tableContent.agencyNumber").trim().isNumeric({ no_symbols: true }),
  body("tableContent.name").trim().not().isEmpty(),
  body("tableContent.status").trim().not().isEmpty(),
  body("tableContent.region").trim().not().isEmpty(),
  body("tableContent.city").trim().not().isEmpty(),
  body("tableContent.staff").trim().not().isEmpty(),
  body("billingZipcode").trim().isPostalCode("US"),
  body("contacts.*.contact").trim().not().isEmpty(),
  body("contacts.*.position").trim().not().isEmpty(),
  body("contacts.*.phoneNumber").trim().isMobilePhone("en-US"),
  body("contacts.*.email").trim().isEmail(),
  body("scheduledNextVisit").trim().isDate({ format: "MM/DD/YYYY" }),
  body("dateOfMostRecentAgreement").trim().isDate({ format: "MM/DD/YYYY" }),
  body("dateOfInitialPartnership").trim().isDate({ format: "MM/DD/YYYY" }),
  body("fileAudit")
    .trim()
    .optional({ checkFalsy: true })
    .isDate({ format: "MM/DD/YYYY" }),
  body("monitored").trim().isDate({ format: "MM/DD/YYYY" }),
  body("foodSafetyCertification").trim().isDate({ format: "MM/DD/YYYY" }),
  validateDistributionStartTime("monday"),
  validateDistributionStartTime("tuesday"),
  validateDistributionStartTime("wednesday"),
  validateDistributionStartTime("thursday"),
  validateDistributionStartTime("friday"),
  validateDistributionStartTime("saturday"),
  validateDistributionStartTime("sunday"),
  body("distributionStartDate").trim().isDate({ format: "MM/DD/YYYY" }),
  body("userSelectedDates.*").trim().isDate({ format: "MM/DD/YYYY" }),
  body("userExcludedDates.*").trim().isDate({ format: "MM/DD/YYYY" }),
  body("tasks.*.title").trim().not().isEmpty(),
  body("tasks.*.dueDate").trim().isDate({ format: "MM/DD/YYYY" }),
  body("tasks.*.status").trim().not().isEmpty(),
  isAuthenticated,
];

/**
 * Route for Put request to create a new Agency in the database
 *
 * Ex: Put request with localhost:8000/agency/
 *
 * @params validationChain - the form fields that will be validated
 * @returns the new Agency object created in Json or any form input errors
 */
router.put("/", validationChain, async (req, res, next) => {
  let invalidFields = []; // will contain the names of any invalid fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    invalidFields = errors.array().map((error) => error.param);
  }

  // manually validate against schema with validateSync()
  const agency = new Agency(req.body);
  const schemaErrors = agency.validateSync();
  if (schemaErrors) {
    invalidFields = invalidFields.concat(Object.keys(schemaErrors.errors));
  }
  if (invalidFields.length > 0) {
    return res.status(400).json({ fields: invalidFields });
  }

  agency
    .save()
    .then(() => {
      res.status(200).json(agency);
    })
    .catch((err) => {
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
router.post("/:id", validationChain, async (req, res, next) => {
  let invalidFields = []; // will contain the names of any invalid fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    invalidFields = errors.array().map((error) => error.param);
  }

  // manually validate against schema with validateSync()
  const agency = new Agency(req.body);
  const schemaErrors = agency.validateSync();
  if (schemaErrors) {
    invalidFields = invalidFields.concat(Object.keys(schemaErrors.errors));
  }
  if (invalidFields.length > 0) {
    return res.status(400).json({ fields: invalidFields });
  }

  Agency.updateOne({ _id: req.params.id }, req.body)
    .then((agency) => {
      res.status(200).json({ agency: agency });
    })
    .catch((err) => {
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
router.get("/:id", isAuthenticated, async (req, res, next) => {
  Agency.findById(req.params.id)
    .then((agency) => {
      res.status(200).json({ agency: agency });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * Route for Get request to read all Agencies
 * 
 * Ex: Get request with localhost:8000/agency/
 * 
 * @params - the object id of the Agency
 * @returns the fetched Agency object in Json
 */
router.get("/table/all", async (req, res, next) => {
  try {
    const agency = await Agency.find({}).select('tableContent');
    return res.status(200).json({
        success: true,
        data: agency
    });
  } catch (err) {
      return res.status(500).json({
          success: false,
          error: 'Server Error'
      });
  }
})

module.exports = router;
