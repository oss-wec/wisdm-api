const { attributes } = require('structure')
const db = require('../db')

const Species = attributes({
  id: {
    type: Number,
    integer: true
  },
  common_name: {
    type: String,
    required: true
  },
  species_code: {
    type: String,
    empty: true
  },
  genus: {
    type: String,
    require: true
  },
  species: {
    type: String,
    require: true
  },
  subspecies: {
    type: String,
    empty: true
  },
  class: {
    type: String,
    empty: true
  },
  subclass: {
    type: String,
    empty: true
  },
  ndow_id: {
    type: Number,
    integer: true
  }
})(class Species {
  static all () {
    return db.manyOrNone('SELECT * FROM species')
  }
})

module.exports = Species
