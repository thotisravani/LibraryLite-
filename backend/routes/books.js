// backend/routes/books.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // ✅ Ensure this file exports a MySQL promise connection

// ✅ GET — fetch all books
router.get("/", async (req, res) => {
  try {
    const [books] = await db.query("SELECT * FROM books");
    res.status(200).json(books);
  } catch (err) {
    console.error("❌ Error fetching books:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// ✅ POST — add a new book
router.post("/", async (req, res) => {
  try {
    const { title, author, category, status } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const [result] = await db.query(
      "INSERT INTO books (title, author, category, status) VALUES (?, ?, ?, ?)",
      [title, author, category || null, status || 'Available']
    );

    res.status(201).json({
      message: "✅ Book added successfully!",
      bookId: result.insertId,
    });
  } catch (err) {
    console.error("❌ Error adding book:", err);
    res.status(500).json({ error: "Failed to add book" });
  }
});

// ✅ DELETE — remove a book by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM books WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "✅ Book deleted successfully!" });
  } catch (err) {
    console.error("❌ Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// ✅ PUT — update book details
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, category, status } = req.body;

    const [result] = await db.query(
      "UPDATE books SET title=?, author=?, category=?, status=? WHERE id=?",
      [title, author, category, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "✅ Book updated successfully!" });
  } catch (err) {
    console.error("❌ Error updating book:", err);
    res.status(500).json({ error: "Failed to update book" });
  }
});

module.exports = router;
