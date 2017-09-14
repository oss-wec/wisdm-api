const { attributes } = require('structure')
const utils = require('../utils')

const Vitals = attributes({
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
  time_rec: {
    type: String,
    required: true
  },
  interval: {
    type: Number
  },
  notes: {
    type: String
  }
})(class Vitals {
  pg () {
    return utils.pg(this, 'vitals')
  }
})

module.exports = Vitals
