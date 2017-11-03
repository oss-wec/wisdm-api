const { attributes } = require('structure')
const utils = require('../utils')

const Necropsies = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  necropsy_date: {
    type: Date,
    empty: true
  },
  general_condition: {
    type: String,
    empty: true
  },
  integument: {
    type: String,
    empty: true
  },
  musculoskeletal: {
    type: String,
    empty: true
  },
  body_cavities: {
    type: String,
    empty: true
  },
  hemolymphatic: {
    type: String,
    empty: true
  },
  respiratory: {
    type: String,
    empty: true
  },
  cardiovascular: {
    type: String,
    empty: true
  },
  digestive: {
    type: String,
    empty: true
  },
  urinary: {
    type: String,
    empty: true
  },
  reproductive: {
    type: String,
    empty: true
  },
  endocrine: {
    type: String,
    empty: true
  },
  nervous: {
    type: String,
    empty: true
  },
  sensory: {
    type: String,
    empty: true
  },
  studies: {
    type: String,
    empty: true
  }
})(class Necropsies {
  pg () {
    return utils.pg(this, 'necropsies')
  }
})

module.exports = Necropsies
