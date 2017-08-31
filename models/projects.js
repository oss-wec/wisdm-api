const { attributes } = require('structure')
const db = require('../db')
const helpers = db.projects.pgp.helpers
const utils = require('../utils')

const Projects = attributes({
  id: {
    type: Number,
    integer: true
  },
  parent_id: {
    type: Number,
    integer: true
  },
  type: {
    type: String,
    required: true,
    equal: ['project', 'stage']
  },
  proj_name: {
    type: String,
    required: true
  },
  proj_desc: {
    type: String
  },
  proj_start: {
    type: Date,
    required: true
  },
  proj_duration: {
    type: Number,
    integer: true,
    required: true
  },
  time_frame: {
    type: String,
    required: true,
    equal: ['years', 'months', 'days', 'weeks']
  }
})(class Projects {
  static all () {
    return db.projects.all()
  }

  noId () {
    const k = Object.keys(this.attributes)
    k.splice(k.indexOf('id'), 1)
    return utils.pick(this, ...k)
  }

  cs () {
    // let columns = Object.keys(this.attributes)
    return new helpers.ColumnSet(this.noId(), { table: 'projects' })
  }

  insert () {
    return helpers.insert(this.noId(), this.cs())
  }
})

module.exports = Projects
