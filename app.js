const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Middleware
app.use(express.json()); // This includes both JSON and URL-encoded body parsing
app.use(express.static(path.join(__dirname, 'public')));

// Database Initialization
const db = require('./models/db');
db.init(); // Make sure db.init() is properly defined in models/db.js

// Routes
const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

// Server Start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
