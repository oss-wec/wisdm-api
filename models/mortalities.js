const { attributes } = require('structure')
const utils = require('../utils')

const Mortalities = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  investigator: {
    type: String,
    empty: true
  },
  cause_of_death: {
    type: String,
    empty: true
  },
  certainty_of_cause: {
    type: Number,
    empty: true
  },
  carcass_age: {
    type: Number,
    integer: true
  },
  femur_index: {
    type: Number,
    integer: true,
    empty: true
  },
  gross_diagnoses: {
    type: String,
    empty: true
  },
  histological_diagnoses: {
    type: String,
    empty: true
  },
  description: {
    type: String,
    empty: true
  },
  mort_date: {
    type: Date,
    empty: true
  }
})(class Mortalities {
  pg () {
    return utils.pg(this, 'mortalities')
  }
})

module.exports = Mortalities
