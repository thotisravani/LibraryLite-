const express = require("express");
const router = express.Router();
const db = require("../db");

// Example home data route
router.get("/", async (req, res) => {
  try {
    const [summary] = await db.query(
      "SELECT COUNT(*) AS total_books FROM books"
    );
    res.json(summary[0]);
  } catch (err) {
    console.error("Error fetching home summary:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
