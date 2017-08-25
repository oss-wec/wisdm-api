'use strict'
const sql = require('../sql').elements

let cs;

class Elements {
  constructor (db, pgp) {
    this.db = db
    this.pgp = pgp
    cs = cs || pgp.helpers.ColumnSet([
      '?id', 'animal_id', 'species_id',
      {
        name: 'sex',
        def: 'unk'
      }
    ], {table: 'elements'})
  }

  all () {
    return this.db.many(sql.all)
  }

  insert (data) {
    const sqlInsert = this.pgp.helpers.insert(data, cs).toString() + ' RETURNING *'
    return this.db.one(sqlInsert)
  }
}

module.exports = Elements
