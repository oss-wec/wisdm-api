const { attributes } = require('structure')
const humps = require('humps')
const db = require('../db')
const sql = require('../db/sql')
const helpers = db.projects.pgp.helpers
const utils = require('../utils')

const ProjectSpecies = attributes({
  id: {
    type: Number,
    integer: true
  },
  species_id: {
    type: Number,
    integer: true
  },
  project_id: {
    type: Number,
    integer: true
  }
})(class ProjectSpecies {
  base () {
    return utils.pick(this, 'species_id', 'project_id')
  }

  cs () {
    return new helpers.ColumnSet(this.base(), { table: 'project_species' })
  }

  sets () {
    return helpers.sets(this.base(), this.cs())
  }

  values () {
    return helpers.values(this.base(), this.cs())
  }
})

const ProjectLocations = attributes({
  id: {
    type: Number,
    integer: true
  },
  project_id: {
    type: Number,
    integer: true
  },
  hunt_unit: {
    type: String
  }
})(class ProjectLocations {
  base () {
    return utils.pick(this, 'project_id', 'hunt_unit')
  }

  cs () {
    return new helpers.ColumnSet(this.base(), { table: 'project_locations' })
  }

  sets () {
    return helpers.sets(this.base(), this.cs())
  }

  values () {
    return helpers.values(this.base(), this.cs())
  }
})

const Projects = attributes({
  id: {
    type: Number,
    integer: true
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
  projectSpecies: {
    type: Array,
    itemType: 'ProjectSpecies'
  },
  projectLocations: {
    type: Array,
    itemType: 'ProjectLocations'
  }
}, {
  dynamics: {
    ProjectSpecies: () => ProjectSpecies,
    ProjectLocations: () => ProjectLocations
  }
})(class Projects {
  static all () {
    return db.projects.all()
  }

  base () {
    return utils.pick(this,
      'proj_name', 'proj_desc', 'proj_start')
  }

  cs () {
    // let columns = Object.keys(this.attributes)
    return new helpers.ColumnSet(this.base(), { table: 'projects' })
  }

  insert () {
    return helpers.insert(this.base(), this.cs()) + ' RETURNING *'
  }

  values () {
    return helpers.values(this.base(), this.cs())
  }

  associativeInsertSql (projectId) {
    const species = this.projectSpecies
      ? db.general.pgp.as.format(sql.general.insert, mapInsert(this, 'projectSpecies', projectId))
      : ''
    const locations = this.projectLocations
      ? db.general.pgp.as.format(sql.general.insert, mapInsert(this, 'projectLocations', projectId))
      : ''

    return helpers.concat([ species, locations ])
  }

  create () {
    return db.tx(t => {
      return t.one(this.insert())
        .then(project => {
          return t.none(this.associativeInsertSql(project.id))
        })
    })
  }
})

const mapInsert = (ctx, ctxKey, id) => {
  const insertObj = {}

  insertObj.values = ctx[ctxKey]
    .map(i => {
      i.project_id = id
      return i.values()
    })
    .reduce((prev, curr) => prev + ', ' + curr)

  insertObj.columns = Object.keys(ctx[ctxKey][0].base())
  insertObj.table = humps.decamelize(ctxKey)

  return insertObj
}

module.exports = Projects
