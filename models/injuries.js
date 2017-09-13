const { attributes } = require('structure')
const utils = require('../utils')

const Injuries = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  injury_side: String,
  injury_location: String,
  injury_type: String,
  injury_description: String,
  injury_treatment: String
})(class Injuries {
  pg () {
    return utils.pg(this, 'injuries')
  }
})

module.exports = Injuries
