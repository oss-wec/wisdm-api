const { attributes } = require('structure')
const sql = require('../db/sql')
// const format = require('pg-promise').as.format
const helpers = require('pg-promise')().helpers

const Element = attributes({
  id: {
    type: Number,
    integer: true
  },
  animal_id: {
    type: Number,
    integer: true,
    required: true
  },
  species_id: {
    type: Number,
    integer: true,
    required: true
  },
  sex: {
    type: String,
    required: true,
    equal: ['male', 'female', 'unk'],
    default: 'unk'
  }
})(class Element {
  constructor (db, pgp) {
    this.db = db
    this.pgp = pgp
  }

  all () {
    return this.db.many(sql.all)
  }

  cs () {
    return new helpers.ColumnSet(this.attributes, { table: 'element' })
  }
})

module.exports = Element
