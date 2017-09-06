const Express = require('express')
const router = Express.Router()
// const db = require('../db')
const models = require('../models')

router.get('/', (req, res) => {
  const proj = new models.Projects({
    type: 'project',
    proj_name: 'Project AB135-X',
    proj_desc: 'description of this project is interesting',
    proj_start: '2017-01-01',
    proj_duration: 1,
    time_frame: 'years',
    projectUsers: [
      {
        user_id: 12,
        project_id: 1,
        type: 'lead'
      }, {
        user_id: 8,
        project_id: 1,
        type: 'lead'
      }
    ],
    projectLocations: [
      {
        project_id: 1,
        hunt_unit: '012'
      }, {
        project_id: 1,
        hunt_unit: '013'
      }
    ],
    projectSpecies: [
      {
        species_id: 1,
        project_id: 1
      }, {
        species_id: 2,
        project_id: 1
      }
    ]
  })

  models.Projects.all()
    .then(data => res.status(200).json({
      data,
      proj,
      cs: proj.cs(),
      insert: proj.insert()
    }))
    .catch(error => res.status(400).json({ error }))
})

router.post('/', (req, res) => {
  console.log(req.body)
  const project = new models.Projects(req.body)

  res.status(200).json({
    keys: Object.keys(project.attributes),
    insert: project.insert(),
    species: project.insertSpecies()
  })
})

module.exports = router
