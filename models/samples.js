const { attributes } = require('structure')
const utils = require('../utils')

const Samples = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  sample: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    empty: true
  },
  test: {
    type: String,
    empty: true
  },
  notes: {
    type: String,
    empty: true
  }
})(class Samples {
  pg () {
    return utils.pg(this, 'samples')
  }
})

module.exports = Samples
