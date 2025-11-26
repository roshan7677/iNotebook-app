const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const mongoose = require("mongoose");
// ROUTE 1: Get all the notes of logged in user : GET: "/api/auth/fetchallnotes". Login required.

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
    // res.json([]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Add a new note : POST: "/api/auth/addnote". Login required.

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Please enter a valid title").isLength({ min: 3 }),
    body("description", "Please enter a valid description").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    // If there are errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Update an existing note : PUT: "/api/auth/updatenote". Login required.
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "Please enter a valid title").isLength({ min: 3 }),
    body("description", "Please enter a valid description").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Invalid note - not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Invalid request.");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  }
);

// ROUTE 4: Delete a note : DELETE: "/api/auth/deletenote". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Validate ID
    const noteId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ error: "Invalid note id" });
    }

    // Find the note to be deleted
    let note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).send("Invalid note - not found");
    }

    // Allow deletion only if the user owns this note.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Invalid request.");
    }

    note = await Note.findByIdAndDelete(noteId);
    res.json({ Success: "Note has been deleted.", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
