// routes/populate.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/populate/:genre", async (req, res) => {
  const { genre } = req.params;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}`
    );
    const books = response.data.items?.map((item) => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.[0] || "Unknown Author",
      tags: genre,
    })) || [];
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

module.exports = router;
