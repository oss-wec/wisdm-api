'use strict'
const sql = require('../sql').elements
const helpers = require('pg-promise')().helpers

let cs

class Elements {
  constructor (db, pgp) {
    this.db = db
    this.pgp = pgp
    cs = cs || pgp.helpers.ColumnSet([
      {
        name: 'animal_id'
      }, {
        name: 'species_id'
      }, {
        name: 'sex',
        def: 'unk'
      }
    ], {table: { table: 'elements' }})
  }

  all () {
    return this.db.many(sql.all)
  }

  findById (id) {
    return this.db.oneOrNone(sql.findById, { id })
  }

  insert (data) {
    const sqlInsert = this.pgp.helpers.insert(data, cs) + ' RETURNING *'
    return this.db.one(sqlInsert)
  }
}

module.exports = Elements
