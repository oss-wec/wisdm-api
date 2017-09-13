const { attributes } = require('structure')
const helpers = require('pg-promise')().helpers

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
    type: String
  },
  notes: {
    type: String
  }
})(class Biometrics {
  // TODO: static getAll method
  // TODO: static findById method
  cs () {
    return new helpers.ColumnSet(this.attributes, { table: 'biometrics' })
  }

  sets () {
    return helpers.sets(this, this.cs())
  }

  values (eventId) {
    this.event_id = eventId
    return helpers.values(this, this.cs())
  }

  insert (eventId) {
    this.event_id = eventId
    return helpers.insert(this, this.cs())
  }
})

module.exports = Biometrics
