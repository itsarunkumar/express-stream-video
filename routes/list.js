const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// List all video files endpoint
router.get("/", (req, res, next) => {
  fs.readdir(path.join(__dirname, "..", "uploads"), (err, files) => {
    if (err) {
      return next(err);
    }

    const videos = files.filter(
      (file) => path.extname(file).toLowerCase() === ".mp4"
    );
    res.json({ videos });
  });
});

module.exports = router;
