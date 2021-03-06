const { attributes } = require('structure')
const utils = require('../utils')

const Biometrics = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  measurement: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  units: {
    type: String,
    empty: true
  },
  notes: {
    type: String,
    empty: true
  }
})(class Biometrics {
  // TODO: static getAll method
  // TODO: static findById method
  pg () {
    return utils.pg(this, 'biometrics')
  }
})

module.exports = Biometrics
