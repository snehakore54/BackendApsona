const db = require('./db');

class user {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  save() {
    return new Promise((resolve, reject) => {
      db.db.run(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [this.username, this.password],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, username: this.username });
          }
        }
      );
    });
  }

  static getByUsername(username) {
    return new Promise((resolve, reject) => {
      db.db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = user;
