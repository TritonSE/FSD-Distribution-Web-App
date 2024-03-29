const express = require("express");
const { body, validationResult } = require("express-validator");

const { isAuthenticated } = require("../middleware/auth");
const { Task } = require("../models");

const router = express.Router();

/**
 * Array of validator functions to use as route handlers in the routes below.
 * These functions validate the expected fields of a task object.
 */
const validationChain = [
  isAuthenticated,
  body("agencyID").notEmpty(),
  body("title").trim().notEmpty(),
  body("dueDate").trim().isDate({ format: "MM/DD/YYYY" }),
  body("status").trim().notEmpty(),
];

/**
 * Route for a PUT request to create a new task in the database.
 *
 * Ex. PUT /task/
 *
 * @returns JSON containing the newly created task object, or a list of errors
 */
router.put("/", validationChain, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      fields: errors.array().map((error) => error.param),
    });
  } else {
    const task = new Task(req.body);
    task
      .save()
      .then(() => {
        res.status(200).json({ task });
      })
      .catch((err) => {
        next(err);
      });
  }
});

/**
 * Route for a POST request to update an existing task in the database.
 *
 * Ex. POST /task/<some task id>
 *
 * @param id The object ID of the task object to update
 * @returns JSON containing the updated task object, or a list of errors
 */
router.post("/:id", validationChain, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      fields: errors.array().map((error) => error.param),
    });
  } else {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((task) => {
        if (task.status !== "Completed" && task.dateCompleted) {
          // remove dateCompleted field if not completed status
          return Task.findByIdAndUpdate(
            req.params.id,
            { $unset: { dateCompleted: 1 } },
            { new: true }
          );
        }
        return task;
      })
      .then((task) => {
        res.status(200).json({ task });
      })
      .catch((err) => {
        next(err);
      });
  }
});

/**
 * Route for a GET request to get all tasks belonging to a certain agency.
 *
 * Ex. GET /task/?agency=<some agency id>
 *
 * @param id The object ID of the agency whose tasks to retrieve
 * @returns JSON containing a list of task objects, or a list of errors
 */
router.get("/", isAuthenticated, async (req, res, next) => {
  Task.find({ agencyID: req.query.agency })
    .then((tasks) => {
      res.status(200).json({ tasks });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * Route for a DELETE request to delete a task.
 *
 * Ex. DELETE /task/<some task id>
 */
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({});
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
