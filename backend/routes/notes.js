const express = require("express");

const { isAuthenticated } = require("../middleware/auth");
const { Notes } = require("../models");

const router = express.Router();

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

router.post("/:id", isAuthenticated, async (req, res, next) => {
  Notes.updateOne({ _id: req.params.id }, req.body)
    .then((note) => {
      res.status(200).json({ note });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  Notes.findById(req.params.id)
    .then((note) => {
      res.status(200).json({ note });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  Notes.findByIdAndDelete(req.params.id)
    .then((note) => {
      res.status(200).json({ note });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/agency/:id", isAuthenticated, async (req, res) => {
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
