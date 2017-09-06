const { attributes } = require('structure')
const db = require('../db')
const helpers = db.projects.pgp.helpers

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
  cs () {
    return new helpers.ColumnSet(this.attributes, { table: 'project_users' })
  }

  insert () {
    return helpers.insert(this.attributes, this.cs())
  }
})

module.exports = ProjectUsers
