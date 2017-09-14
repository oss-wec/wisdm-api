const { attributes } = require('structure')
const utils = require('../utils')

const LabIds = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  lab_id: {
    type: String,
    required: true
  }
})(class LabIds {
  pg () {
    return utils.pg(this, 'lab_ids')
  }
})

module.exports = LabIds
