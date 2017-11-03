const { attributes } = require('structure')
const utils = require('../utils')

const Medications = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  medication: {
    type: String,
    required: true
  },
  med_time: {
    type: String,
    empty: true
  },
  med_dose: {
    type: Number,
    empty: true
  },
  med_unit: {
    type: String,
    empty: true
  },
  med_method: {
    type: String,
    empty: true
  },
  med_notes: {
    type: String,
    empty: true
  }
})(class Medications {
  pg () {
    return utils.pg(this, 'medications')
  }
})

module.exports = Medications
