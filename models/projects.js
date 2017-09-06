const { attributes } = require('structure')
const db = require('../db')
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
    return new helpers.ColumnSet(this.base(), {table: 'project_species'})
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
})(class ProjectLocations {})

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
  },
  projectUsers: {
    type: Array,
    itemType: 'ProjectUsers'
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
    ProjectUsers: () => require('./projectUsers'),
    ProjectSpecies: () => ProjectSpecies,
    ProjectLocations: () => ProjectLocations
  }
})(class Projects {
  static all () {
    return db.projects.all()
  }

  base () {
    return utils.pick(this,
      'parent_id', 'type', 'proj_name', 'proj_desc', 'proj_start', 'proj_duration',
      'time_frame')
  }

  cs () {
    // let columns = Object.keys(this.attributes)
    return new helpers.ColumnSet(this.base(), { table: 'projects' })
  }

  insert () {
    return helpers.insert(this.base(), this.cs())
  }

  insertSpecies () {
    const insertObj = {}

    insertObj.values = this.projectSpecies.map(i => {
      return i.values()
    })

    insertObj.columns = Object.keys(this.projectSpecies[0].attributes)
    
    return insertObj
  }
})

module.exports = Projects
