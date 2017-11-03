const { attributes } = require('structure')
const db = require('../db')
const helpers = db.general.pgp.helpers

const Marks = attributes({
  element_id: {
    type: Number,
    integer: true
  },
  mark_type: {
    type: String,
    required: true
  },
  mark_id: {
    type: String,
    required: true
  },
  mark_color: {
    type: String,
    empty: true
  },
  mark_location: {
    type: String,
    required: true
  },
  date_given: {
    type: Date,
    empty: true
  },
  notes: {
    type: String,
    empty: true
  },
  date_removed: {
    type: Date,
    empty: true
  }
})(class Marks {
  // TODO: static all method
  cs () {
    return new helpers.ColumnSet(this.attributes, { table: 'marks' })
  }

  sets () {
    return helpers.sets(this.attributes, this.cs())
  }

  values () {
    return helpers.values(this.attributes, this.cs())
  }

  insert () {
    return helpers.insert(this.attributes, this.cs())
  }
})

module.exports = Marks
