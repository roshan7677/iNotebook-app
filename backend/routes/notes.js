const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
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

module.exports = router;
