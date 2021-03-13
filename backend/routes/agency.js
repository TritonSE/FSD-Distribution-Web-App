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
    let fields = Object.values(schemaErrors.errors).map((error) => error.path);
    invalidFields = invalidFields.concat(fields);
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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

module.exports = router;
