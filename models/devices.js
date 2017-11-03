const { attributes } = require('structure')
const helpers = require('pg-promise')().helpers

const Devices = attributes({
  element_id: {
    type: Number,
    integer: true
  },
  type: {
    type: String,
    required: true
  },
  serial_num: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  inservice: {
    type: Date,
    empty: true
  },
  outservice: {
    type: Date,
    empty: true
  }
})(class Device {
  // TODO: static all method
  cs () {
    return new helpers.ColumnSet(this.attributes, { table: 'deployments' })
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

module.exports = Devices
