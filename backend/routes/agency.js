const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const { isAuthenticated } = require("../middleware/auth");
const { Agency } = require("../models");
const router = express.Router();

/**
 * Checks that the distribution start time for the given day is ISO 8601 format,
 * if the day is selected, using express-validator.
 * @param {String} day Day of the week to check ("monday", "tuesday", etc.)
 */
const validateDistributionStartTime = (day) =>
  body(`distributionStartTimes.${day}`)
    .trim()
    .if((value, { req }) => req.body.distributionDays[day])
    .isISO8601();

/**
 * Checks that the retail rescue start time for the given day is ISO 8601
 * format, if the day is selected, using express-validator.
 * @param {String} day Day of the week to check ("monday", "tuesday", etc.)
 */
const validateRetailRescueStartTime = (day) =>
  body(`retailRescueStartTimes.${day}`)
    .trim()
    .if((value, { req }) => req.body.retailRescueDays[day])
    .isISO8601();

/**
 * Checks that the retail rescue location for the given day exists, if the day
 * is selected, using express-validator.
 * @param {String} day Day of the week to check ("monday", "tuesday", etc.)
 */
const validateRetailRescueLocation = (day) =>
  body(`retailRescueLocations.${day}`)
    .trim()
    .if((value, { req }) => req.body.retailRescueDays[day])
    .not()
    .isEmpty();

/**
 * Form Validation: validationChain is an array of expected formats for the
 * specified model fields.
 */
const validationChain = [
  body("tableContent.agencyNumber").trim().isNumeric({ no_symbols: true }),
  body("tableContent.dateOfInitialPartnership")
    .trim()
    .isDate({ format: "MM/DD/YYYY" }),
  body("billingZipcode").trim().isPostalCode("US"),
  body("contacts.*.phoneNumber").trim().isMobilePhone("en-US"),
  body("contacts.*.email").trim().isEmail(),
  body("scheduledNextVisit").trim().isDate({ format: "MM/DD/YYYY" }),
  body("dateOfMostRecentAgreement").trim().isDate({ format: "MM/DD/YYYY" }),
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
  validateRetailRescueStartTime("monday"),
  validateRetailRescueStartTime("tuesday"),
  validateRetailRescueStartTime("wednesday"),
  validateRetailRescueStartTime("thursday"),
  validateRetailRescueStartTime("friday"),
  validateRetailRescueStartTime("saturday"),
  validateRetailRescueStartTime("sunday"),
  validateRetailRescueLocation("monday"),
  validateRetailRescueLocation("tuesday"),
  validateRetailRescueLocation("wednesday"),
  validateRetailRescueLocation("thursday"),
  validateRetailRescueLocation("friday"),
  validateRetailRescueLocation("saturday"),
  validateRetailRescueLocation("sunday"),
  body("tasks.*.dueDate").trim().isDate({ format: "MM/DD/YYYY" }),
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
 router.get('/', isAuthenticated, async (req, res, next) => {
  Agency.find({}, 'tableContent userSelectedDates userExcludedDates distributionDays distributionStartTimes distributionStartDate distributionFrequency pantry mealProgram homeboundDeliveryPartner largeScaleDistributionSite residentialFacility')
    .then((agencies) => {
      res.status(200).json({ agencies });
    })
    .catch((err) => {
      next(err);
    });
  });

/**
 *
 * Ex: Get request with localhost:8000/agency/table/all
 *
 * @params - the object id of the Agency
 * @returns the fetched Agency object in Json
 */
router.get("/table/all", async (req, res, next) => {
  try {
    const agency = await Agency.find({}, { _id: 0 }).select("tableContent");
    return res.status(200).json({
      success: true,
      data: agency,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = router;
