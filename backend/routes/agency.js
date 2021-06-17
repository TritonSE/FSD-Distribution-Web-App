const express = require("express");
const { body, validationResult } = require("express-validator");

const { isAuthenticated } = require("../middleware/auth");
const { Agency } = require("../models");

const router = express.Router();

const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

/**
 * Validators to check that the distribution start time for each day is ISO 8601 format,
 * if the day is selected, using express-validator.
 */
const distributionStartTimeValidators = WEEKDAYS.map((day) =>
  body(`distributionStartTimes.${day}`)
    .trim()
    .if((value, { req }) => req.body.distributionDays[day])
    .isISO8601()
);

/**
 * Validators to check that the retail rescue start time for each day is ISO 8601
 * format, if the day is selected, using express-validator.
 */
const retailRescueStartTimeValidators = WEEKDAYS.map((day) =>
  body(`retailRescueStartTimes.${day}`)
    .trim()
    .if((value, { req }) => req.body.retailRescueDays[day])
    .isISO8601()
);

/**
 * Validators to check that the retail rescue location for each day exists, if the day
 * is selected, using express-validator.
 */
const retailRescueLocationValidators = WEEKDAYS.map((day) =>
  body(`retailRescueLocations.${day}`)
    .trim()
    .if((value, { req }) => req.body.retailRescueDays[day])
    .not()
    .isEmpty()
);

/**
 * Form Validation: validationChain is an array of expected formats for the
 * specified model fields.
 */
const validationChain = [
  isAuthenticated,
  body("tableContent.agencyNumber").trim().isNumeric({ no_symbols: true }),
  body("tableContent.dateOfInitialPartnership").trim().isDate({ format: "MM/DD/YYYY" }),
  body("billingZipcode").trim().isPostalCode("US"),
  body("contacts.*.phoneNumber").trim().isMobilePhone("en-US"),
  body("contacts.*.email").trim().isEmail(),
  body("scheduledNextVisit").trim().isDate({ format: "MM/DD/YYYY" }),
  body("dateOfMostRecentAgreement").trim().isDate({ format: "MM/DD/YYYY" }),
  body("fileAudit").trim().optional({ checkFalsy: true }).isDate({ format: "MM/DD/YYYY" }),
  body("monitored").trim().isDate({ format: "MM/DD/YYYY" }),
  body("foodSafetyCertification").trim().isDate({ format: "MM/DD/YYYY" }),
  body("distributionStartDate").trim().isDate({ format: "MM/DD/YYYY" }),
  body("userSelectedDates.*").trim().isISO8601(),
  body("userExcludedDDates.*").trim().isISO8601(),
  body("userExcludedRDates.*").trim().isISO8601(),
  ...distributionStartTimeValidators,
  ...retailRescueStartTimeValidators,
  ...retailRescueLocationValidators,
];

const checkValidationResults = (req, res, next) => {
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
    res.status(400).json({ fields: invalidFields });
  } else {
    next();
  }
};

/**
 * Route for Put request to create a new Agency in the database
 *
 * Ex: Put request with /agency/
 *
 * @params validationChain - the form fields that will be validated
 * @returns the new Agency object created in Json or any form input errors
 */
router.put("/", validationChain, checkValidationResults, async (req, res, next) => {
  new Agency(req.body)
    .save()
    .then((agency) => {
      console.log(agency);
      res.status(200).json({ agency });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * Route for Post request to update a current Agency in the database
 *
 * Ex: Post request with /agency/{object id}
 *
 * @params the object id of the Agency
 * @params validationChain - the form fields that will be validated
 * @returns the updated Agency object in Json or any form input errors
 */
router.post("/:id", validationChain, checkValidationResults, async (req, res, next) => {
  Agency.findByIdAndUpdate(req.params.id, req.body)
    .then((agency) => {
      console.log(agency);
      res.status(200).json({ agency });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * Route to get all agencies in the database
 *
 * Ex: Get request with /agency/all
 *
 * @params - the object id of the Agency
 * @returns the fetched Agency object in Json
 */
router.get("/all", isAuthenticated, async (req, res, next) => {
  Agency.find(
    {},
    "tableContent userSelectedDates userExcludedDDates userExcludedRDates distributionDays distributionStartTimes distributionExcludedTimes distributionStartDate distributionFrequency retailRescueDays retailRescueStartTimes retailRescueExcludedTimes"
  )
    .then((agencies) => {
      res.status(200).json({ agencies });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * Route for Get request to read a current Agency in the database
 *
 * Ex: Get request with /agency/{object id}
 *
 * @params - the object id of the Agency
 * @returns the fetched Agency object in Json
 */
router.get("/:id", isAuthenticated, async (req, res, next) => {
  Agency.findById(req.params.id)
    .then((agency) => {
      res.status(200).json({ agency });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 *
 * Ex: Get request with /agency/table/all
 *
 * @params - the object id of the Agency
 * @returns the fetched Agency object in Json
 */
router.get("/table/all", async (req, res) => {
  try {
    const agency = await Agency.find({}).select("tableContent");
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

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  Agency.findByIdAndDelete(req.params.id)
    .then((agency) => {
      res.status(200).json({ agency });
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
