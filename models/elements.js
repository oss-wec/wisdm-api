const { attributes } = require('structure')
const db = require('../db')
// const format = require('pg-promise').as.format
// const helpers = require('pg-promise')().helpers

const Elements = attributes({
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
  static all () {
    return db.elements.all()
  }
})

module.exports = Elements
