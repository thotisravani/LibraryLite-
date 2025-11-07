const express = require("express");
const router = express.Router();
const db = require("../db");

// Add member
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO members (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone]
    );
    res.status(201).json({ message: "Member added successfully", id: result.insertId });
  } catch (err) {
    console.error("Error adding member:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get all members
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM members");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
