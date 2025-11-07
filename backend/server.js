const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const booksRoutes = require("./routes/books");
const membersRoutes = require("./routes/members");
const reportsRoutes = require("./routes/reports");
const homeRoutes = require("./routes/home");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Register route files properly
app.use("/api/books", booksRoutes);
app.use("/api/members", membersRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/home", homeRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
