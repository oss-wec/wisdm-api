'use strict'
const sql = require('../sql').elements
const helpers = require('pg-promise')().helpers

const cs = new helpers.ColumnSet([
  {
    name: 'animal_id',
  }, {
    name: 'species_id',
  }, {
    name: 'sex',
    def: 'unk'
  }
], {table: { table: 'elements' }})

class Elements {
  constructor (db, pgp) {
    this.db = db
    this.pgp = pgp
    this.cs = cs || pgp.helpers.ColumnSet([
      '?id',
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

  insert (data) {
    const sqlInsert = this.pgp.helpers.insert(data, this.cs).toString() + ' RETURNING *'
    return this.db.one(sqlInsert)
  }
}

module.exports = Elements