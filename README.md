📚 Library Lite

A small web application to manage books, members, lending, waitlists, and reports.
Includes an optional AI-powered “Populate Library” feature that can auto-fill books based on a given genre.

🚀 Features

Add and manage Books (title, author, tags)

Add and manage Members

Lend and Return books

Manage Waitlists when books are unavailable

Generate simple Reports (e.g., overdue books)

(Optional) Populate Library with books by genre using an LLM or web search

🧭 Instructions on How to Run the App
1. Clone the Repository
git clone https://github.com/your-username/library-lite.git
cd library-lite

2. Install Dependencies
cd backend
npm install
cd ../frontend
npm install

3. Set Up the Database
mysql -u root -p
CREATE DATABASE library_lite;

4. Configure .env

Inside backend/.env:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=library_lite
PORT=5000

5. Run the App
# Run backend
cd backend
npm start

# Run frontend
cd ../frontend
npm start


Then visit → http://localhost:3000

🤖 Populate Library (Optional Feature)

Navigate to Library Page

Enter a genre (e.g., “Fantasy”)

Click Populate Library

The app will auto-add sample books for that genre using:

Either a mock dataset

Or a live API/LLM if connected

🧩 Assumptions

Titles are unique.

Members are identified by email.

Works with MySQL locally.

Designed for Node.js 18+ and React 18+.

“Populate Library” uses either:

Dummy data, or

An API like Open Library or Google Books.
