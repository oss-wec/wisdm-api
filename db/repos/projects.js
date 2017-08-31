'use strict'
const sql = require('../sql').projects

class Projects {
  constructor (db, pgp) {
    this.db = db
    this.pgp = pgp
  }

  all () {
    return this.db.many(sql.all)
  }
}

module.exports = Projects
