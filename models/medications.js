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
    type: String
  },
  med_dose: {
    type: Number
  },
  med_unit: {
    type: String
  },
  med_method: {
    type: String
  },
  med_notes: {
    type: String
  }
})(class Medications {
  pg () {
    return utils.pg(this, 'medications')
  }
})

module.exports = Medications
