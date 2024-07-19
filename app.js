const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

const db = require('./models/db');
db.init();

const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
