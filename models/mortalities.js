const { attributes } = require('structure')
const utils = require('../utils')

const Mortalities = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  investigator: {
    type: String
  },
  cause_of_death: {
    type: String
  },
  certainty_of_cause: {
    type: Number
  },
  carcass_age: {
    type: Number,
    integer: true
  },
  femur_index: {
    type: Number,
    integer: true
  },
  gross_diagnoses: {
    type: String
  },
  histological_diagnoses: {
    type: String
  },
  description: {
    type: String
  },
  mort_date: {
    type: Date
  }
})(class Mortalities {
  pg () {
    return utils.pg(this, 'mortalities')
  }
})

module.exports = Mortalities
