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
  reencounter: {
    type: Boolean,
    required: true
  },
  relocated: {
    type: Boolean,
    required: true
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
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    empty: true
  },
  rel_x: {
    type: Number,
    empty: true
  },
  rel_y: {
    type: Number,
    empty: true
  },
  rel_location: {
    type: String,
    empty: true
  },
  capture_time: {
    type: String,
    empty: true
  },
  start_time: {
    type: String,
    empty: true
  },
  end_time: {
    type: String,
    empty: true
  },
  comments: {
    type: String,
    empty: true
  },
  Biometrics: {
    type: Array,
    itemType: 'Biometrics'
  },
  Injuries: {
    type: Array,
    itemType: 'Injuries'
  },
  Samples: {
    type: Array,
    itemType: 'Samples'
  },
  LabIds: {
    type: Array,
    itemType: 'LabIds'
  },
  Medications: {
    type: Array,
    itemType: 'Medications'
  },
  Vitals: {
    type: Array,
    itemType: 'Vitals'
  },
  Mortality: {
    type: 'Mortality'
  },
  Necropsy: {
    type: 'Necropsy'
  }
}, {
  dynamics: {
    Biometrics: () => require('./biometrics'),
    Injuries: () => require('./injuries'),
    Medications: () => require('./medications'),
    Samples: () => require('./samples'),
    LabIds: () => require('./labids'),
    Vitals: () => require('./vitals'),
    Necropsy: () => require('./necropsies'),
    Mortality: () => require('./mortalities')
  }
})(class Events {
  base () {
    return utils.pick(this,
      'element_id', 'project_id', 'status', 'age', 'event_date', 'enc_method', 'enc_reason', 'x',
      'y', 'comments', 'location', 'rel_x', 'rel_y', 'rel_location', 'capture_time', 'start_time', 
      'end_time', 'reencounter', 'relocated'
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

  insert (elementId) {
    console.log(elementId)
    this.element_id = elementId
    return helpers.insert(this, this.cs()) + ' RETURNING *'
  }
})

module.exports = Events
