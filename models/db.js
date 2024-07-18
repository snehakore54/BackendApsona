const sqlite3 = require('sqlite3').verbose();

class DB {
  constructor() {
    this.db = new sqlite3.Database('db.sqlite', (err) => {
      if (err) {
        console.error('Could not connect to database', err);
      } else {
        console.log('Connected to database');
        this.init(); // Ensure tables are created when connected
      }
    });
  }

  init() {
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          username TEXT UNIQUE,
          password TEXT
        );
      `);
      this.db.run(`
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY,
          title TEXT,
          content TEXT,
          userId INTEGER,
          FOREIGN KEY (userId) REFERENCES users(id)
        );
      `);
      this.db.run(`
        CREATE TABLE IF NOT EXISTS labels (
          id INTEGER PRIMARY KEY,
          name TEXT
        );
      `);
      this.db.run(`
        CREATE TABLE IF NOT EXISTS note_labels (
          noteId INTEGER,
          labelId INTEGER,
          PRIMARY KEY (noteId, labelId),
          FOREIGN KEY (noteId) REFERENCES notes(id),
          FOREIGN KEY (labelId) REFERENCES labels(id)
        );
      `);
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Could not close the database', err);
      } else {
        console.log('Closed the database connection');
      }
    });
  }
}

module.exports = new DB();
