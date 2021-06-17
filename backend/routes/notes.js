const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { Notes } = require("../models");

const router = express.Router();

/**
 * Route for Put request to create a new note in the database
 *
 * Ex: Put request with /notes/
 *
 * @returns the new Note object in json
 */
router.put("/", isAuthenticated, async (req, res, next) => {
  const note = new Notes(req.body);
  note
    .save()
    .then(() => {
      res.status(200).json(note);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * Route to receive Post requests to update selected note object
 *
 * Ex: Post request with /notes/{note id}
 *
 * @params - object id of note
 * @returns the updated Note object in json
 */
router.post("/:id", isAuthenticated, async (req, res, next) => {
  Notes.updateOne({ _id: req.params.id }, req.body)
    .then((note) => {
      res.status(200).json({ note });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * Route for Get request to return a note object from database
 *
 * Ex: Get request with /notes/{note id}
 *
 * @params - object id of note
 * @returns the fetched Note object in json format
 */
router.get("/:id", isAuthenticated, async (req, res, next) => {
  Notes.findById(req.params.id)
    .then((note) => {
      res.status(200).json({ note });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * Route for Delete request to delete note object in database
 *
 * Ex: Delete request with /notes/{note id}
 *
 * @params - object id of note
 * @returns the deleted Agency in json
 */
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  Notes.findByIdAndDelete(req.params.id)
    .then((note) => {
      res.status(200).json({ note });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * Route for Delete request to delete multiple
 * note objects that correspond to a specific id
 *
 * @params - object id of note
 * @returns the deleted Agency in json
 */
router.delete("/all/:id", isAuthenticated, async (req, res) => {
  const conditions = { agencyID: req.params.id };

  try {
    const notes = await Notes.deleteMany(conditions);
    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

/**
 * Route for Delete request to delete recurring note objects
 *
 * @params - object id of note
 * @returns the deleted Agency in json
 */
router.delete("/", isAuthenticated, async (req, res) => {
  const conditions = { recurringID: req.body.rID, timeFromEpoch: { $gte: req.body.tFE } };
  try {
    const notes = await Notes.deleteMany(conditions);
    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = router;
