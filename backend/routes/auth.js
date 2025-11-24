const express = require("express");
const router = express.Router();

// Create a user using : POST: "/api/auth". Doesn't require Auth.
router.get("/", (req, res) => {
  console.log(req.body);
  res.send("hello");
});

module.exports = router;
