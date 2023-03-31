const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Download endpoint
router.get("/:filename", (req, res, next) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "..", "uploads", filename);

  fs.stat(filePath, (err, stat) => {
    if (err) {
      if (err.code === "ENOENT") {
        return res.status(404).send("File not found");
      }

      return next(err);
    }

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Length", stat.size);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

module.exports = router;
