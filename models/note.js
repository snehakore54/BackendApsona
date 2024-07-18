const db = require('./db');

class note {
  constructor(title, content, userId) {
    this.title = title;
    this.content = content;
    this.userId = userId;
  }

  save() {
    return new Promise((resolve, reject) => {
      db.db.run(
        `INSERT INTO notes (title, content, userId) VALUES (?, ?, ?)`,
        [this.title, this.content, this.userId],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, title: this.title, content: this.content, userId: this.userId });
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.db.all(`SELECT * FROM notes`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.db.get(`SELECT * FROM notes WHERE id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static update(id, title, content) {
    return new Promise((resolve, reject) => {
      db.db.run(
        `UPDATE notes SET title = ?, content = ? WHERE id = ?`,
        [title, content, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.db.run(`DELETE FROM notes WHERE id = ?`, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = note;
