const express = require("express");
const mongoose = require("mongoose");

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
      res.status(200).json({ note: note });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  Notes.findById(req.params.id)
    .then((note) => {
      res.status(200).json({ note: note });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", async (req, res, next) => {
  Notes.findByIdAndDelete(req.params.id)
    .then((note) => {
      res.status(200).json({ note });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;