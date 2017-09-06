const { attributes } = require('structure')
const db = require('../db')
const helpers = db.projects.pgp.helpers
const utils = require('../utils')

const ProjectUsers = attributes({
  id: {
    type: Number,
    integer: true
  },
  user_id: {
    type: Number,
    integer: true,
    required: true
  },
  project_id: {
    type: Number,
    integer: true,
    required: true
  },
  type: {
    type: String,
    required: true,
    equal: ['lead', 'collaborator', 'admin']
  }
})(class ProjectUser {
  base () {
    return utils.pick(this, 'user_id', 'project_id', 'type')
  }

  cs () {
    return new helpers.ColumnSet(this.base(), { table: 'project_users' })
  }

  sets () {
    return helpers.sets(this.base(), this.cs())
  }

  values () {
    return helpers.values(this.base(), this.cs())
  }
})

module.exports = ProjectUsers
