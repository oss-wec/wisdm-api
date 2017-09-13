const { attributes } = require('structure')
const helpers = require('pg-promise')().helpers
const utils = require('../utils')

const Events = attributes({
  element_id: {
    type: Number,
    integer: true
  },
  project_id: {
    type: Number,
    integer: true,
    required: true
  },
  status: {
    type: String,
    required: true,
    equal: ['alive', 'mortality', 'harvest', 'unk']
  },
  age: {
    type: String,
    default: null
  },
  event_date: {
    type: Date,
    required: true
  },
  enc_method: {
    type: String,
    equal: ['basecamp', 'capture crew', 'marked observation', 'unmarked observation',
      'marked mortality', 'unmarked mortality'],
    required: true
  },
  enc_reason: {
    type: String,
    empty: true,
    equal: ['disease surveilance', 'population monitoring', 'translocation', 'incidental'],
    default: null
  },
  x: {
    type: Number
  },
  y: {
    type: Number
  },
  comments: {
    type: String
  },
  Biometrics: {
    type: Array,
    itemType: 'Biometrics'
  },
  Injuries: {
    type: Array,
    itemType: 'Injuries'
  }
  // Samples: {
  //   type: Array,
  //   itemType: 'Samples'
  // },
  // LabIds: {
  //   type: Array,
  //   itemType: 'LabIds'
  // },
  // Medications: {
  //   type: Array,
  //   itemType: 'Medications'
  // },
  // Vitals: {
  //   type: Array,
  //   itemType: 'Vitals'
  // },
  // Injuries: {
  //   type: Array,
  //   itemType: 'Injuries'
  // },
  // Mortality: {
  //   type: 'Mortality'
  // },
  // Necropsy: {
  //   type: 'Necropsy'
  // }
}, {
  dynamics: {
    Biometrics: () => require('./biometrics'),
    Injuries: () => require('./injuries')
  }
})(class Events {
  base () {
    return utils.pick(this,
      'element_id', 'project_id', 'status', 'age', 'event_date', 'enc_method', 'enc_reason', 'x', 'y', 'comments'
    )
  }

  cs () {
    return new helpers.ColumnSet(this.base(), { table: 'events' })
  }

  sets () {
    return helpers.sets(this.base(), this.cs())
  }

  values () {
    return helpers.values(this.base(), this.cs())
  }

  insert (encounterId) {
    console.log(encounterId)
    return helpers.insert(this, this.cs()) + ' RETURNING *'
  }
})

module.exports = Events
