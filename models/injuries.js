const { attributes } = require('structure')
const utils = require('../utils')

const Injuries = attributes({
  event_id: {
    type: Number,
    integer: true
  },
  injury_side: {
    type: String,
    empty: true
  },
  injury_location: {
    type: String,
    empty: true
  },
  injury_type: {
    type: String,
    empty: true
  },
  injury_description: {
    type: String,
    empty: true
  },
  injury_treatment: {
    type: String,
    empty: true
  }
})(class Injuries {
  pg () {
    return utils.pg(this, 'injuries')
  }
})

module.exports = Injuries
