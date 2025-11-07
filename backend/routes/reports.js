const express = require("express");
const router = express.Router();
const db = require("../db");

// Overdue reports
router.get("/overdue", async (req, res) => {
  try {
    const [overdue] = await db.query(
      "SELECT * FROM borrowed_books WHERE due_date < NOW()"
    );
    res.json(overdue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Borrowing statistics
router.get("/stats", async (req, res) => {
  try {
    const [[stats]] = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM books) AS total_books,
        (SELECT COUNT(*) FROM members) AS total_members,
        (SELECT COUNT(*) FROM borrowed_books WHERE return_date IS NULL) AS borrowed,
        (SELECT COUNT(*) FROM borrowed_books WHERE due_date < NOW()) AS overdue
    `);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
