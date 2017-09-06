const sql = require('../sql').general

class General {
  constructor (db, pgp) {
    this.db = db
    this.pgp = pgp
  }

  insert (obj) {
    return this.db.any(sql.all, obj)
  }
}

module.exports = General
