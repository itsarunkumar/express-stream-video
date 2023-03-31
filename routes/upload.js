const express = require("express");
const multer = require("multer");
const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create Multer upload middleware
const upload = multer({ storage }).single("file");

// Upload endpoint
router.post("/", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }

    res.json({ message: "File uploaded successfully" });
  });
});

module.exports = router;
